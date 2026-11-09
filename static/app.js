"use strict";
/* ===================== CẤU HÌNH ===================== */
// Số vùng & kích thước lưới có thể chỉnh ở đây (luật chơi thì cố định).
const LEVELS = [
  { key: "easy",   name: "Dễ",         rows: 5,  cols: 5,  regions: 5,  tone: "#aaf0bf" },
  { key: "normal", name: "Bình thường", rows: 8,  cols: 8,  regions: 8,  tone: "#ffe27a" },
  { key: "hard",   name: "Khó",        rows: 11, cols: 11, regions: 11, tone: "#ff9db6" },
  // Màn nâng cấp: không có vùng 1 ô, có NHIỀU đáp án hợp lệ (min/max_sols = số đáp án tối thiểu/tối đa)
  { key: "easy2",   name: "Dễ+",         rows: 6,  cols: 6,  regions: 6,  tone: "#aaf0bf", plus: { min_region: 2, min_sols: 2, max_sols: 3 } },
  { key: "normal2", name: "Bình thường+", rows: 9,  cols: 9,  regions: 9,  tone: "#ffe27a", plus: { min_region: 2, min_sols: 2, max_sols: 5 } },
  { key: "hard2",   name: "Khó+",        rows: 12, cols: 12, regions: 12, tone: "#ff9db6", plus: { min_region: 2, min_sols: 3, max_sols: 8 } },
];
const CUSTOM_DEFAULT = { rows: 9, cols: 9, regions: 9 };
const LIMITS = { min: 4, max: 14 };
const TIME_LIMIT = 15 * 60;        // quá 15 phút là thua
const HINT_PENALTY = 30;           // giây
const STAR3_PER_REGION = 15;       // 3 sao: <= 15s × số vùng
const STAR2_PER_REGION = 40;       // 2 sao: <= 40s × số vùng
const COLORS = ["#a5c8ff", "#ffc98b", "#a6e3a1", "#d4a5ff", "#fff09a", "#8fe3d8", "#ff9fc6",
                "#b5b9ff", "#c9e87a", "#9ad7f5", "#e0b79b", "#d9d9d9", "#f0c4e8", "#85b8a0"];

/* ===================== TIỆN ÍCH ===================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const fmt = s => { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
const cfgKey = c => `${c.rows}x${c.cols}x${c.regions}` + (c.plus ? "+" : "");
const thresholds = K => ({ t3: STAR3_PER_REGION * K, t2: STAR2_PER_REGION * K });
const starsFor = (t, K) => { const h = thresholds(K); return t <= h.t3 ? 3 : t <= h.t2 ? 2 : 1; };
function shade(hex, l) { // màu vùng -> màu đậm cho quân tướng
  let r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0, s = 0;
  if (d) { s = d / (1 - Math.abs(mx + mn - 1)); h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
  return `hsl(${h.toFixed(0)} ${Math.min(100, s * 100 + 30).toFixed(0)}% ${l}%)`;
}
const CROWN = '<svg viewBox="0 0 24 24"><use href="#crown"/></svg>';
const STAR = '<svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg>';
const icon = (id, cls = "ic") => `<svg class="${cls}"><use href="#${id}"/></svg>`;
// API tính theo đường dẫn hiện tại (chạy được cả khi truy cập qua proxy như code-server: /proxy/8000/)
const BASE = location.pathname.replace(/[^/]*$/, "");
const apiUrl = q => `${location.origin}${BASE}api/puzzle?${q}`;

/* ===================== ÂM THANH ===================== */
const Sound = {
  on: store.get("queens.sound") !== false, ctx: null,
  beep(f, d = .12, type = "sine", vol = .12, when = 0, slide) {
    if (!this.on) return;
    try {
      this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t = c.currentTime + when;
      o.type = type; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d);
    } catch {}
  },
  place() { this.beep(420, .14, "triangle", .15, 0, 760); },
  remove() { this.beep(320, .1, "sine", .1, 0, 200); },
  mark() { this.beep(260, .05, "square", .04); },
  bad() { this.beep(170, .25, "sawtooth", .08, 0, 110); },
  hint() { this.beep(880, .1, "sine", .1); this.beep(1320, .15, "sine", .1, .1); },
  star(i) { this.beep(660 + i * 220, .3, "triangle", .15); },
  win() { [523, 659, 784, 1047].forEach((f, i) => this.beep(f, .25, "triangle", .15, i * .12)); },
  lose() { [440, 370, 311, 220].forEach((f, i) => this.beep(f, .35, "sawtooth", .08, i * .18)); },
  click() { this.beep(600, .05, "sine", .06); },
};

/* ===================== HIỆU ỨNG (confetti) ===================== */
const fx = $("#fx"), fctx = fx.getContext("2d"); let parts = [], fxRun = false;
function sizeFx() { fx.width = innerWidth * devicePixelRatio; fx.height = innerHeight * devicePixelRatio; }
function confetti(n = 160) {
  sizeFx();
  const cols = ["#fbbf24", "#fb7185", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];
  for (let i = 0; i < n; i++) parts.push({
    x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .4, vx: (Math.random() - .5) * 16, vy: -Math.random() * 16 - 4,
    s: 6 + Math.random() * 7, c: cols[i % cols.length], r: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 140 + Math.random() * 60 });
  if (!fxRun) { fxRun = true; requestAnimationFrame(stepFx); }
}
function stepFx() {
  const k = devicePixelRatio; fctx.clearRect(0, 0, fx.width, fx.height);
  parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 30);
  for (const p of parts) {
    p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
    fctx.save(); fctx.translate(p.x * k, p.y * k); fctx.rotate(p.r); fctx.globalAlpha = Math.min(1, p.life / 40);
    fctx.fillStyle = p.c; fctx.fillRect(-p.s * k / 2, -p.s * k / 3, p.s * k, p.s * k * .6); fctx.restore();
  }
  if (parts.length) requestAnimationFrame(stepFx); else { fxRun = false; fctx.clearRect(0, 0, fx.width, fx.height); }
}

/* ===================== ĐIỀU HƯỚNG ===================== */
function show(id) {
  $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  document.body.classList.toggle("on-start", id === "screen-start");
  if (id === "screen-levels") renderLevels();
}
const modal = (id, on) => $(id).classList.toggle("hidden", !on);
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2800);
}
document.addEventListener("pointerdown", e => { // gợn sóng khi bấm nút
  const b = e.target.closest(".btn"); if (!b) return;
  Sound.click();
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), sp = document.createElement("span");
  sp.className = "ripple"; sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(sp); setTimeout(() => sp.remove(), 650);
});
$("#btn-start").onclick = () => show("screen-levels");
$("#btn-help").onclick = $("#btn-help2").onclick = () => modal("#modal-help", true);
$$("[data-close]").forEach(b => b.onclick = () => modal("#modal-help", false));
$("#modal-help").onclick = e => { if (e.target.id === "modal-help") modal("#modal-help", false); };
$$("[data-go]").forEach(b => b.onclick = () => show(b.dataset.go));
function updSoundBtn() { $("#btn-sound").innerHTML = icon(Sound.on ? "i-vol" : "i-mute") + "Âm thanh: " + (Sound.on ? "bật" : "tắt"); }
$("#btn-sound").onclick = () => { Sound.on = !Sound.on; store.set("queens.sound", Sound.on); updSoundBtn(); Sound.click(); };
updSoundBtn();

/* ===================== CHỌN MÀN ===================== */
let custom = Object.assign({}, CUSTOM_DEFAULT, store.get("queens.custom") || {});
function bandColors(R, C, K) { // hình xem trước: các dải màu chéo
  return Array.from({ length: R }, (_, r) => Array.from({ length: C }, (_, c) =>
    COLORS[Math.min(K - 1, Math.floor((r + c) * K / (R + C - 1))) % COLORS.length]));
}
function previewHTML(c) {
  const px = Math.max(5, Math.floor(64 / Math.max(c.rows, c.cols)));
  return `<div class="lv-prev" style="grid-template-columns:repeat(${c.cols},var(--pc));--pc:${px}px">` +
    bandColors(c.rows, c.cols, c.regions).flat().map(col => `<i style="--bg:${col}"></i>`).join("") + "</div>";
}
function bestInfo(c) { return store.get("queens.best." + cfgKey(c)); }
function miniStars(c) {
  const st = (bestInfo(c) || {}).stars || 0;
  return `<div class="mini-stars">${[1, 2, 3].map(i => `<svg class="star ${i <= st ? "" : "off"}" viewBox="0 0 24 24"><use href="#i-star"/></svg>`).join("")}</div>`;
}
function bestText(c) { const b = bestInfo(c); return b ? "Kỷ lục " + fmt(b.time) : "Chưa chơi"; }
function renderLevels() {
  const box = $("#levels"); box.innerHTML = "";
  const card = (L, name, tone) => {
    const d = document.createElement("div"); d.className = "lv"; d.style.setProperty("--tone", tone);
    d.innerHTML = `<div class="lv-top"><span class="chip">${name}</span>${miniStars(L)}</div>
      <div class="lv-main"><div class="lv-size">${L.rows}<small>×</small>${L.cols}</div>${previewHTML(L)}</div>
      <div class="lv-foot"><span>${L.regions} vùng${L.plus ? " · nhiều đáp án" : ""}</span><span>${bestText(L)}</span></div>`;
    return d;
  };
  const head = t => { const h = document.createElement("h3"); h.className = "grp"; h.textContent = t; box.appendChild(h); };
  head("Cổ điển");
  LEVELS.forEach(L => {
    if (L.plus && !box.querySelector(".grp.plus")) { head("Nâng cấp · nhiều đáp án"); box.lastChild.classList.add("plus"); }
    const d = card(L, L.name, L.tone); d.onclick = () => startGame(L, L.name); box.appendChild(d);
  });

  const d = document.createElement("div"); d.className = "lv custom-lv"; d.id = "lv-custom"; d.style.setProperty("--tone", "#cdb8ff");
  d.innerHTML = `<div class="lv-head"><div class="lv-top"><span class="chip">Tùy chỉnh</span><span class="chev">${icon("i-back")}</span></div>
      <div class="lv-main"><div class="lv-size" id="cv-size"></div><div id="cv-prev"></div></div></div>
    <div class="custom">
      <label>Hàng <input type="range" id="c-rows" min="${LIMITS.min}" max="${LIMITS.max}"><b id="v-rows"></b></label>
      <label>Cột <input type="range" id="c-cols" min="${LIMITS.min}" max="${LIMITS.max}"><b id="v-cols"></b></label>
      <label>Số vùng <input type="range" id="c-regions" min="3"><b id="v-regions"></b></label>
      <button class="btn primary go">Chơi!</button>
    </div>`;
  d.querySelector(".lv-head").onclick = () => d.classList.toggle("open");
  d.querySelector(".chev .ic").style.transform = "rotate(-90deg)";
  box.appendChild(d);
  const sync = () => {
    custom.rows = +$("#c-rows").value || custom.rows; custom.cols = +$("#c-cols").value || custom.cols;
    const mx = Math.min(custom.rows, custom.cols, 14), rg = $("#c-regions");
    rg.max = mx; custom.regions = Math.max(3, Math.min(custom.regions, mx)); rg.value = custom.regions;
    $("#v-rows").textContent = custom.rows; $("#v-cols").textContent = custom.cols; $("#v-regions").textContent = custom.regions;
    $("#cv-size").innerHTML = `${custom.rows}<small>×</small>${custom.cols}`;
    $("#cv-prev").outerHTML = `<div id="cv-prev">${previewHTML(custom)}</div>`;
    store.set("queens.custom", custom);
  };
  $("#c-rows").value = custom.rows; $("#c-cols").value = custom.cols;
  ["rows", "cols"].forEach(k => $("#c-" + k).oninput = () => { custom[k] = +$("#c-" + k).value; sync(); });
  $("#c-regions").oninput = e => { custom.regions = +e.target.value; sync(); };
  sync();
  d.querySelector(".go").onclick = () => startGame({ ...custom }, "Tùy chỉnh");
}

/* ----- hình trang trí ở màn bắt đầu ----- */
function buildHero() {
  const hero = $("#hero"), K = 5, size = Math.min(56, Math.floor((innerWidth - 80) / 5));
  hero.style.setProperty("--hc", size + "px");
  const grid = [[0, 0, 1, 1, 1], [0, 2, 2, 1, 3], [0, 2, 4, 3, 3], [2, 2, 4, 4, 3], [2, 4, 4, 4, 3]];
  const crowns = { "0,1": 0, "1,3": 1, "2,0": 2, "3,4": 3, "4,2": 4 };
  grid.forEach((row, r) => row.forEach((reg, c) => {
    const i = document.createElement("i"), col = COLORS[[0, 1, 2, 3, 4][reg] * 2 % COLORS.length];
    i.style.setProperty("--bg", col);
    if (c < 4 && grid[r][c + 1] !== reg) i.classList.add("br");
    if (r < 4 && grid[r + 1][c] !== reg) i.classList.add("bb");
    const k = crowns[r + "," + c];
    if (k !== undefined) { i.innerHTML = CROWN; i.firstChild.style.cssText = `--pc:${shade(col, 58)};--d:${k * 160}`; }
    hero.appendChild(i);
  }));
}
buildHero();
document.body.classList.add("on-start");

/* ===================== TRẠNG THÁI GAME ===================== */
let G = null; // {cfg,name,P,state,cells,history,markMode,acc,last,running,penalty,hints,over}

async function startGame(cfg, name) {
  modal("#modal-result", false);
  $("#loading").classList.remove("hidden");
  try {
    const res = await fetch(apiUrl(`rows=${cfg.rows}&cols=${cfg.cols}&regions=${cfg.regions}${cfg.plus ? "&mode=multi&" + new URLSearchParams(cfg.plus) : ""}&_=${Date.now()}`));
    const text = await res.text();
    let P; try { P = JSON.parse(text); } catch { throw new Error("Không kết nối được server game (hãy mở đúng địa chỉ chạy server.py)"); }
    if (!res.ok) throw new Error(P.error || "Lỗi server");
    beginGame(cfg, name, P);
  } catch (e) {
    toast(e.message);
  } finally { $("#loading").classList.add("hidden"); }
}

function beginGame(cfg, name, P) {
  stopTimer();
  G = { cfg, name, P, state: P.grid.map(r => r.map(() => 0)), cells: [], history: [], markMode: false,
        acc: 0, last: 0, running: false, penalty: 0, hints: 0, over: false, bad: new Set() };
  $("#g-level").textContent = name;
  $("#g-size").textContent = `${P.rows}×${P.cols} · ${P.regions} vùng`;
  $("#g-total").textContent = P.regions;
  $("#btn-mark").classList.remove("on");
  $("#pause-cover").classList.add("hidden");
  $("#g-note").textContent = cfg.plus ? "Màn nâng cấp: không có vùng 1 ô và có nhiều cách đặt đúng — chỉ cần đặt đủ và đúng luật là thắng"
    : P.unique ? "Chạm để đặt tướng · Chuột phải hoặc nút Đánh dấu để ghi chú ô trống"
    : "Màn này có thể có nhiều đáp án — đặt đúng luật là thắng!";
  buildBoard(); show("screen-game"); sizeBoard(); refresh(true);
  startTimer();
}

function buildBoard() {
  const { P } = G, board = $("#board"); board.innerHTML = "";
  board.style.setProperty("--rows", P.rows); board.style.setProperty("--cols", P.cols);
  for (let r = 0; r < P.rows; r++) {
    G.cells.push([]);
    for (let c = 0; c < P.cols; c++) {
      const reg = P.grid[r][c], el = document.createElement("button");
      el.className = "cell"; el.dataset.r = r; el.dataset.c = c;
      if (c < P.cols - 1 && P.grid[r][c + 1] !== reg) el.classList.add("br");
      if (r < P.rows - 1 && P.grid[r + 1][c] !== reg) el.classList.add("bb");
      el.style.setProperty("--bg", COLORS[reg % COLORS.length]);
      el.style.setProperty("--r", r); el.style.setProperty("--c", c);
      el.setAttribute("aria-label", `Hàng ${r + 1}, cột ${c + 1}`);
      el._kind = 0; el._bad = false;
      board.appendChild(el); G.cells[r].push(el);
    }
  }
}
function sizeBoard() {
  if (!G) return;
  const w = Math.min(innerWidth - 56, 640), h = innerHeight - 340;
  const cell = Math.max(22, Math.floor(Math.min(w / G.P.cols, h / G.P.rows, 64)));
  document.documentElement.style.setProperty("--cell", cell + "px");
}
addEventListener("resize", () => { sizeBoard(); sizeFx(); });

/* ---------- luật ---------- */
function queens() {
  const q = [];
  G.state.forEach((row, r) => row.forEach((v, c) => { if (v === 1) q.push([r, c]); }));
  return q;
}
function badSet(q) {
  const bad = new Set(), g = G.P.grid;
  for (let i = 0; i < q.length; i++) for (let j = i + 1; j < q.length; j++) {
    const [r1, c1] = q[i], [r2, c2] = q[j];
    if (r1 === r2 || c1 === c2 || g[r1][c1] === g[r2][c2] || (Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1)) {
      bad.add(r1 * 100 + c1); bad.add(r2 * 100 + c2);
    }
  }
  return bad;
}

/* ---------- vẽ ---------- */
function refresh(silent) {
  const q = queens(), bad = badSet(q);
  for (let r = 0; r < G.P.rows; r++) for (let c = 0; c < G.P.cols; c++) {
    const el = G.cells[r][c], v = G.state[r][c], isBad = bad.has(r * 100 + c);
    if (el._kind !== v) {
      el.innerHTML = "";
      if (v === 1) {
        const p = document.createElement("div"); p.className = "piece"; p.innerHTML = CROWN;
        p.style.setProperty("--pc", shade(COLORS[G.P.grid[r][c] % COLORS.length], 58)); el.appendChild(p);
      } else if (v === 2) el.innerHTML = '<span class="mark"><svg viewBox="0 0 24 24" style="width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:3.4;stroke-linecap:round"><path d="M6 6l12 12M18 6L6 18"/></svg></span>';
      el._kind = v; el._bad = false;
    }
    if (v === 1) {
      const p = el.firstChild;
      p.classList.toggle("bad", isBad);
      if (isBad && !el._bad && !silent) { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }
      el._bad = isBad;
    }
  }
  if (!silent && [...bad].some(k => !G.bad.has(k))) Sound.bad();
  G.bad = bad;
  const n = q.length, cnt = $("#g-placed");
  if (cnt.textContent != n) { cnt.textContent = n; cnt.parentElement.classList.remove("bump"); void cnt.offsetWidth; cnt.parentElement.classList.add("bump"); }
  if (!silent && n === G.P.regions && bad.size === 0) win(q);
}

/* ---------- thao tác ---------- */
function setCells(changes, record = true) { // changes: [[r,c,from,to]...]
  changes.forEach(([r, c, , to]) => G.state[r][c] = to);
  if (record) G.history.push(changes);
}
function ripple(el) {
  const s = document.createElement("span"); s.className = "rp"; el.appendChild(s); setTimeout(() => s.remove(), 550);
}
function act(r, c, alt) {
  if (!G || G.over || !G.running) return;
  const cur = G.state[r][c], mark = alt || G.markMode;
  let to;
  if (mark) { if (cur === 1) return; to = cur === 2 ? 0 : 2; }
  else to = cur === 1 ? 0 : 1;
  ripple(G.cells[r][c]);
  setCells([[r, c, cur, to]]);
  to === 1 ? Sound.place() : to === 2 ? Sound.mark() : Sound.remove();
  refresh();
}
$("#board").addEventListener("click", e => { const b = e.target.closest(".cell"); if (b) act(+b.dataset.r, +b.dataset.c, false); });
$("#board").addEventListener("contextmenu", e => { e.preventDefault(); const b = e.target.closest(".cell"); if (b) act(+b.dataset.r, +b.dataset.c, true); });
$("#board").addEventListener("pointerover", e => { // làm nổi bật hàng/cột khi rê chuột
  if (e.pointerType !== "mouse" || !G) return;
  const b = e.target.closest(".cell"); if (!b) return;
  const r = +b.dataset.r, c = +b.dataset.c;
  G.cells.forEach((row, y) => row.forEach((el, x) => el.classList.toggle("hl", (y === r || x === c) && !(y === r && x === c))));
});
$("#board").addEventListener("pointerleave", () => G && G.cells.forEach(row => row.forEach(el => el.classList.remove("hl"))));

$("#btn-mark").onclick = () => { G.markMode = !G.markMode; $("#btn-mark").classList.toggle("on", G.markMode); };
function undo() {
  if (!G || G.over || !G.running || !G.history.length) return;
  const ch = G.history.pop();
  ch.forEach(([r, c, from]) => G.state[r][c] = from);
  Sound.remove(); refresh(true);
}
$("#btn-undo").onclick = undo;
addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); undo(); }
  if (e.key === "Escape") { modal("#modal-help", false); }
});
$("#btn-restart").onclick = () => {
  if (!G || G.over) return;
  const ch = [];
  G.state.forEach((row, r) => row.forEach((v, c) => { if (v) ch.push([r, c, v, 0]); }));
  if (ch.length) { setCells(ch); refresh(true); Sound.remove(); }
};
$("#btn-hint").onclick = () => {
  if (!G || G.over || !G.running) return;
  const q = queens();
  const qk = new Set(q.map(([r, c]) => r * 100 + c));
  // nhiều đáp án: bám theo đáp án trùng nhiều nhất với quân người chơi đã đặt
  const sol = (G.P.solutions || [G.P.solution]).reduce((best, s) =>
    s.filter(([r, c]) => qk.has(r * 100 + c)).length > best.filter(([r, c]) => qk.has(r * 100 + c)).length ? s : best);
  const have = new Set(q.map(([r, c]) => r * 100 + c));
  const missing = sol.filter(([r, c]) => !have.has(r * 100 + c));
  if (!missing.length) return toast("Bạn đã đặt đúng hết rồi!");
  // ưu tiên ô mà người chơi chưa có quân nào xung đột
  const free = missing.filter(([r, c]) => !q.some(([a, b]) => a === r || b === c || G.P.grid[a][b] === G.P.grid[r][c] || (Math.abs(a - r) <= 1 && Math.abs(b - c) <= 1)));
  const [hr, hc] = (free.length ? free : missing)[Math.floor(Math.random() * (free.length || missing.length))];
  const changes = [];
  for (const [a, b] of q) if (a === hr || b === hc || G.P.grid[a][b] === G.P.grid[hr][hc] || (Math.abs(a - hr) <= 1 && Math.abs(b - hc) <= 1))
    changes.push([a, b, 1, 0]);
  changes.push([hr, hc, G.state[hr][hc], 1]);
  setCells(changes);
  G.penalty += HINT_PENALTY; G.hints++;
  const el = G.cells[hr][hc]; el.classList.remove("hint"); void el.offsetWidth; el.classList.add("hint");
  Sound.hint(); toast(`Đã đặt 1 tướng, cộng thêm ${HINT_PENALTY} giây`);
  refresh(); tick();
};

/* ===================== ĐỒNG HỒ ===================== */
let tmr = null;
const elapsed = () => G ? (G.acc + (G.running ? performance.now() - G.last : 0)) / 1000 + G.penalty : 0;
function startTimer() { G.last = performance.now(); G.running = true; clearInterval(tmr); tmr = setInterval(tick, 200); tick(); }
function stopTimer() { clearInterval(tmr); if (G && G.running) { G.acc += performance.now() - G.last; G.running = false; } }
function tick() {
  if (!G) return;
  const t = elapsed(), K = G.P.regions, h = thresholds(K);
  $("#t-text").textContent = fmt(t);
  const tm = $("#timer"), tb = $("#timebar"), w = t >= 720 && t < 840, d = t >= 840;
  tm.classList.toggle("warn", w); tm.classList.toggle("danger", d); tb.classList.toggle("warn", w); tb.classList.toggle("danger", d);
  tb.style.width = Math.min(100, t / TIME_LIMIT * 100) + "%";
  const st = starsFor(t, K);
  $$("#live-stars .star").forEach((s, i) => s.classList.toggle("off", i >= st));
  if (t >= TIME_LIMIT && !G.over) lose();
}
function pause(on) {
  if (!G || G.over) return;
  if (on && G.running) { stopTimer(); $("#pause-cover").classList.remove("hidden"); $("#pause-use").setAttribute("href", "#i-play"); }
  else if (!on && !G.running) { startTimer(); $("#pause-cover").classList.add("hidden"); $("#pause-use").setAttribute("href", "#i-pause"); }
}
$("#btn-pause").onclick = () => pause(G.running);
$("#btn-resume").onclick = () => pause(false);
$("#btn-quit").onclick = () => { stopTimer(); G = null; show("screen-levels"); };

/* ===================== THẮNG / THUA ===================== */
function win(q) {
  G.over = true; stopTimer(); tick();
  const t = elapsed(), K = G.P.regions, st = starsFor(t, K), key = "queens.best." + cfgKey(G.cfg);
  const old = store.get(key), record = !old || t < old.time || (t === old.time && st > old.stars);
  const best = (!old || t < old.time) ? { time: Math.floor(t), stars: st } : { time: old.time, stars: Math.max(old.stars, st) };
  store.set(key, best);
  q.forEach(([r, c], i) => { const el = G.cells[r][c]; el.style.setProperty("--i", i); el.classList.add("won"); });
  Sound.win(); confetti(120);
  setTimeout(() => {
    const msgs = { 3: "Tuyệt đỉnh! Bạn là tướng quân thực thụ!", 2: "Rất tốt! Thêm chút nữa là đủ ba sao.", 1: "Hoàn thành! Thử lại để nhanh hơn nhé." };
    const card = $("#modal-result .card"); card.classList.remove("lose");
    $("#res-icon").innerHTML = CROWN; $("#res-title").textContent = "Chiến thắng!";
    $("#res-msg").textContent = msgs[st] + (record ? " Kỷ lục mới!" : "");
    $("#res-time").textContent = fmt(t); $("#res-best").textContent = fmt(best.time); $("#res-hints").textContent = G.hints;
    $$("#res-stars .star").forEach((s, i) => {
      s.setAttribute("class", "star"); s.style.setProperty("--d", (i * .45 + .2) + "s");
      void s.getBoundingClientRect(); if (i < st) { s.classList.add("on"); setTimeout(() => Sound.star(i), (i * .45 + .3) * 1000); }
    });
    modal("#modal-result", true);
    setTimeout(() => confetti(st * 60), 400);
  }, 1100);
}
function lose() {
  G.over = true; stopTimer(); Sound.lose();
  const card = $("#modal-result .card"); card.classList.add("lose");
  $("#res-icon").innerHTML = icon("i-clock"); $("#res-title").textContent = "Hết giờ — Thua cuộc!";
  $("#res-msg").textContent = "Bạn đã vượt quá 15 phút. Đừng nản, thử lại nhé!";
  $("#res-time").textContent = "15:00+"; $("#res-hints").textContent = G.hints;
  const b = store.get("queens.best." + cfgKey(G.cfg)); $("#res-best").textContent = b ? fmt(b.time) : "--:--";
  modal("#modal-result", true);
}
$("#res-again").onclick = () => G && startGame(G.cfg, G.name);
$("#res-menu").onclick = () => { modal("#modal-result", false); G = null; show("screen-levels"); };
