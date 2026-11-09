#!/usr/bin/env python3
"""Queens - Đặt Tướng: server localhost.

Chạy:  python3 server.py [--port 8000] [--host 127.0.0.1] [--open]
Server phục vụ file tĩnh trong ./static và API sinh màn chơi:
    GET /api/puzzle?rows=8&cols=8&regions=8
"""
import argparse
import json
import os
import random
import threading
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
MIN_SIZE, MAX_SIZE, MAX_REGIONS = 4, 14, 14
GEN_BUDGET = 3.0  # giây tối đa để tìm màn có nghiệm duy nhất


# ----------------------------------------------------------------- generator
def place_queens(R, C, K, rng):
    """Đặt K quân: khác hàng, khác cột, không kề nhau (kể cả chéo)."""
    for _ in range(200):
        rows = sorted(rng.sample(range(R), K))
        cols_used, pos = set(), []

        def dfs(i):
            if i == K:
                return True
            r = rows[i]
            cs = list(range(C))
            rng.shuffle(cs)
            for c in cs:
                if c in cols_used:
                    continue
                if pos and pos[-1][0] == r - 1 and abs(pos[-1][1] - c) <= 1:
                    continue
                cols_used.add(c)
                pos.append((r, c))
                if dfs(i + 1):
                    return True
                pos.pop()
                cols_used.discard(c)
            return False

        if dfs(0):
            return pos
    return None


def neighbors4(r, c, R, C):
    if r > 0:
        yield r - 1, c
    if r < R - 1:
        yield r + 1, c
    if c > 0:
        yield r, c - 1
    if c < C - 1:
        yield r, c + 1


def grow_regions(R, C, queens, rng):
    """Mỗi quân là hạt giống của một vùng, vùng lan dần ra ngẫu nhiên."""
    K = len(queens)
    grid = [[-1] * C for _ in range(R)]
    frontier = [[] for _ in range(K)]
    weight = [rng.uniform(0.35, 1.0) for _ in range(K)]
    for i, (r, c) in enumerate(queens):
        grid[r][c] = i
    for i, (r, c) in enumerate(queens):
        frontier[i].extend(neighbors4(r, c, R, C))
    left = R * C - K
    while left:
        cand = [i for i in range(K) if frontier[i]]
        i = rng.choices(cand, weights=[weight[j] for j in cand])[0]
        k = rng.randrange(len(frontier[i]))
        frontier[i][k], frontier[i][-1] = frontier[i][-1], frontier[i][k]
        r, c = frontier[i].pop()
        if grid[r][c] != -1:
            continue
        grid[r][c] = i
        left -= 1
        frontier[i].extend(n for n in neighbors4(r, c, R, C) if grid[n[0]][n[1]] == -1)
    return grid


def solve(grid, R, C, K, limit=2):
    """Tìm tối đa `limit` nghiệm (backtracking, chọn vùng ít ô khả dụng nhất)."""
    cells = [[] for _ in range(K)]
    for r in range(R):
        for c in range(C):
            cells[grid[r][c]].append((r, c))
    blocked = [[0] * C for _ in range(R)]
    placed = [None] * K
    sols = []

    def touch(r, c, d):
        for x in range(C):
            blocked[r][x] += d
        for y in range(R):
            if y != r:
                blocked[y][c] += d
        for y in (r - 1, r + 1):
            if 0 <= y < R:
                for x in (c - 1, c + 1):
                    if 0 <= x < C:
                        blocked[y][x] += d

    def dfs(n):
        if len(sols) >= limit:
            return
        if n == K:
            sols.append([p for p in placed])
            return
        best, best_opts = -1, None
        for i in range(K):
            if placed[i] is not None:
                continue
            opts = [p for p in cells[i] if blocked[p[0]][p[1]] == 0]
            if best_opts is None or len(opts) < len(best_opts):
                best, best_opts = i, opts
                if len(opts) <= 1:
                    break
        if not best_opts:
            return
        for (r, c) in best_opts:
            placed[best] = (r, c)
            touch(r, c, 1)
            dfs(n + 1)
            touch(r, c, -1)
            placed[best] = None
            if len(sols) >= limit:
                return

    dfs(0)
    return sols


def split_without(grid, R, C, reg, removed, keep):
    """Các cell của vùng `reg` (bỏ `removed`) không nối được với `keep`."""
    seen = {keep}
    stack = [keep]
    while stack:
        r, c = stack.pop()
        for n in neighbors4(r, c, R, C):
            if n != removed and grid[n[0]][n[1]] == reg and n not in seen:
                seen.add(n)
                stack.append(n)
    return [(r, c) for r in range(R) for c in range(C)
            if grid[r][c] == reg and (r, c) != removed and (r, c) not in seen]


def repair(grid, R, C, K, target, rng, deadline, max_iter=300):
    """Sửa biên vùng đến khi chỉ còn đúng 1 nghiệm (nghiệm gốc `target`)."""
    tset = set(target)

    def try_move(r, c):
        reg = grid[r][c]
        if (r, c) in tset:
            return False
        nregs = {grid[n[0]][n[1]] for n in neighbors4(r, c, R, C)} - {reg}
        if not nregs:
            return False
        new = rng.choice(sorted(nregs))
        orphans = split_without(grid, R, C, reg, (r, c), target[reg])
        grid[r][c] = new
        for (y, x) in orphans:  # phần bị tách rời sáp nhập luôn sang vùng mới
            grid[y][x] = new
        return True

    for _ in range(max_iter):
        if time.time() > deadline:
            return grid, False
        sols = solve(grid, R, C, K, 2)
        others = [s for s in sols if set(s) != tset]
        if not others:
            return grid, True
        cells = [p for s in others for p in s if p not in tset]
        rng.shuffle(cells)
        if not any(try_move(r, c) for r, c in cells):
            return grid, False
    return grid, False


def generate(R, C, K, seed=None):
    rng = random.Random(seed)
    # lưới lệch / ít vùng hơn số hàng: rất khó duy nhất, không chờ lâu
    deadline = time.time() + (GEN_BUDGET if K == min(R, C) else 0.8)
    best = None
    while True:
        queens = place_queens(R, C, K, rng)
        if queens is None:
            return None
        grid = grow_regions(R, C, queens, rng)
        grid, ok = repair(grid, R, C, K, queens, rng, deadline)
        cand = {"grid": grid, "solution": queens, "unique": ok}
        if ok:
            return cand
        best = best or cand
        if time.time() > deadline:
            return best


def generate_multi(R, C, K, min_region=2, min_sols=2, max_sols=6, seed=None, budget=4.0):
    """Màn "nâng cấp": không vùng nào nhỏ hơn `min_region` ô và có từ `min_sols`
    đến `max_sols` đáp án hợp lệ (nhiều hơn 1 cách đặt)."""
    rng = random.Random(seed)
    deadline = time.time() + budget
    best = None

    def sizes_ok(g):
        cnt = [0] * K
        for row in g:
            for v in row:
                cnt[v] += 1
        return min(cnt) >= min_region

    while True:
        queens = place_queens(R, C, K, rng)
        if queens is None:
            return None
        grid = grow_regions(R, C, queens, rng)
        if not sizes_ok(grid):
            if time.time() > deadline:
                return best
            continue
        target = queens
        tset = set(target)
        for _ in range(400):
            sols = solve(grid, R, C, K, max_sols + 1)
            if len(sols) <= max_sols:
                break
            others = [x for x in sols if set(x) != tset]
            cells = [p for x in others for p in x if p not in tset]
            rng.shuffle(cells)
            for (r, c) in cells:
                reg = grid[r][c]
                nregs = sorted({grid[n[0]][n[1]] for n in neighbors4(r, c, R, C)} - {reg})
                if not nregs:
                    continue
                backup = [row[:] for row in grid]
                new = rng.choice(nregs)
                orphans = split_without(grid, R, C, reg, (r, c), target[reg])
                grid[r][c] = new
                for (y, x) in orphans:
                    grid[y][x] = new
                if sizes_ok(grid):
                    break
                grid = backup
            else:
                break
            if time.time() > deadline:
                break
        sols = solve(grid, R, C, K, max_sols + 1)
        if min_sols <= len(sols) <= max_sols and sizes_ok(grid):
            return {"grid": grid, "solution": sols[0], "solutions": sols, "unique": False}
        if time.time() > deadline:
            if best is None and sols and sizes_ok(grid):
                best = {"grid": grid, "solution": sols[0], "solutions": sols[:max_sols], "unique": len(sols) == 1}
            return best


# -------------------------------------------------------------------- server
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        if "/api/" in (args[0] if args else ""):
            super().log_message(fmt, *args)

    def send_json(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/api/puzzle":
            q = parse_qs(url.query)
            try:
                R = int(q.get("rows", ["8"])[0])
                C = int(q.get("cols", ["8"])[0])
                K = int(q.get("regions", [str(min(R, C))])[0])
            except ValueError:
                return self.send_json({"error": "Tham số không hợp lệ"}, 400)
            if not (MIN_SIZE <= R <= MAX_SIZE and MIN_SIZE <= C <= MAX_SIZE):
                return self.send_json({"error": f"Kích thước lưới từ {MIN_SIZE} đến {MAX_SIZE}"}, 400)
            if not (3 <= K <= min(R, C, MAX_REGIONS)):
                return self.send_json({"error": f"Số vùng phải từ 3 đến {min(R, C, MAX_REGIONS)}"}, 400)
            if q.get("mode", [""])[0] == "multi":
                try:
                    mr = int(q.get("min_region", ["2"])[0])
                    lo = int(q.get("min_sols", ["2"])[0])
                    hi = int(q.get("max_sols", ["6"])[0])
                except ValueError:
                    return self.send_json({"error": "Tham số không hợp lệ"}, 400)
                if not (1 <= mr <= 4 and 2 <= lo <= hi <= 50):
                    return self.send_json({"error": "Tham số nhiều đáp án không hợp lệ"}, 400)
                res = generate_multi(R, C, K, mr, lo, hi)
            else:
                res = generate(R, C, K)
            if res is None:
                return self.send_json({"error": "Không thể tạo màn với cấu hình này, hãy đổi số vùng/kích thước"}, 422)
            return self.send_json({
                "rows": R, "cols": C, "regions": K,
                "grid": res["grid"], "solution": res["solution"], "unique": res["unique"],
                "solutions": res.get("solutions") or [res["solution"]],
            })
        if url.path == "/":
            self.path = "/index.html"
        return super().do_GET()


def main():
    ap = argparse.ArgumentParser(description="Queens - Đặt Tướng")
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8000)
    ap.add_argument("--open", action="store_true", help="tự mở trình duyệt")
    args = ap.parse_args()
    srv = ThreadingHTTPServer((args.host, args.port), Handler)
    url = f"http://{args.host}:{args.port}/"
    print(f"♛ Queens đang chạy tại {url}  (Ctrl+C để dừng)")
    if args.open:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng server.")


if __name__ == "__main__":
    main()
