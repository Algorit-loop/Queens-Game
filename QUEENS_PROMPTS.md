# Queens – Đặt Tướng: nhật ký prompt & prompt tái tạo

Tài liệu gồm 3 phần + phụ lục:

1. **Phần 1** – Toàn bộ prompt bạn đã gửi (nguyên văn, theo thứ tự).
2. **Phần 2** – Prompt/đặc tả chính xác để gửi cho AI nhằm dựng lại đúng game hiện tại.
3. **Phần 3** – Trỏ tới file riêng `UI_STYLE_GUIDE.md` (phong cách giao diện Neo-brutalism / sticker UI và prompt thiết kế dùng chung).
4. **Phụ lục** – Mã nguồn tham chiếu đầy đủ (server.py, index.html, style.css, app.js, fonts.css).

---

# PHẦN 1 – Các prompt đã gửi (nguyên văn)

## Prompt 1 – Yêu cầu ban đầu

```
Tạo trò chơi sau có server.py (chạy localhost)
Trò chơi đơn giản thôi đó là trò chơi đặt các quân tướng và một lưới N * M
khi đặt một quân tướng xuống thì 8 ô xung quanh quân tướng đó không được đặt quân tướng
các ô cùng hàng hoặc cùng cột cũng không được đặt quân tướng khác
mỗi lưới có một màu, các màu chia thành các vùng, mỗi vùng chỉ có 1 quân tướng

yêu cầu đặt toàn bộ quân tướng xuống (số quân tướng ứng với số vùng, mỗi vùng có một màu khác nhau)

trò chơi này cũng có vẻ nổi tiếng nhỉ
hãy giúp tôi tạo ra game đó, có màn hình bắt đầu, ấn start

tạm thời tạo ra 3 màn dễ, bình thường, khó (số vùng và kích thước lưới có thể tùy chỉnh) nhưng luật thì không được điều chỉnh

màn hình có nút start và hướng dẫn, trong hướng dẫn ghi luật 

sau khi đặt xong có màn hình thắng, có đồng hồ đếm giờ khi chơi (gồm giây và phút), vượt quá 15 phút thì thua cuộc

khi win sẽ có 3 kết quả, 1 sao, 2 sao, 3 sao tùy thuộc vào thời gian hoàn thành 

hãy giúp tôi tạo nhé, giao diện đẹp, có hiệu ứng + animation khi click, press, đặt được, không đặt được (khi đặt quân tướng xuống mà quân tướng đó vi phạm rule thì vẫn đặt được nhưng quân tướng đó sẽ bị màu đỏ), còn quân tướng nào không phạm rule thì cùng màu với vùng 

bạn có thể cải thiện thêm nếu bạn muốn
```

## Prompt 2 – Lỗi API + chê UI/font

```
1. khi tôi ấn vào màn thì 
Unexpected token 'N', "Not found." is not valid JSON
2. UI/UX không đẹp (cụ thể là font chữ)
ví dụ như màn dễ đi, 5 x 5, ai lại đi dùng font bình thường, hãy tham khảo giao diện / font chữ / bố cục của các game khác như nào rồi làm cho đẹp chứ
```

## Prompt 3 – Xác minh tính duy nhất của đáp án

```
Theo như tôi thấy và phản hồi của bạn, các màn (lưới ô vuông được tạo) sẽ chỉ có một cách đặt duy nhất hợp lệ thôi đúng không ?
hãy xác minh điều này
```

## Prompt 4 – Thêm các màn "nâng cấp" (nhiều đáp án, không vùng 1 ô)

```
Bạn đã làm tốt rồi nhưng chúng ta sẽ điều chỉnh một chút (hoặc xây lại)
Ở đây ta đang nói về logic GEN lưới, không liên quan đến những cái khác

Hiên tại các màn (dễ, vừa, khó) thì tôi thấy có sự xuất hiện của 1 ô 1 màu, có nghĩa là ô đó chắc chắn đặt tướng xuống -> nhưng tôi cũng thấy hợp lý vì đó là màn dễ

Bây giờ hãy tạo cho tôi THÊM các màn dễ - nâng cấp, vừa - nâng cấp, khó - nâng cấp, các màn mới này khắc phục việc tôi đề cập ở trên và các màn này sẽ có nhiều phương án -> làm tăng độ khó của màn
```

## Prompt 5 – Yêu cầu tạo file .md này

```
Tốt, bây giờ tạo một file .md
1. Ghi lại toàn bộ prompt mà "tôi đã gửi cho bạn" để làm game này
2. Tạo cho tôi một prompt (hoặc là tài liệu) chính xác để khi gửi lên cho bạn (AI) thì sẽ tạo ra được một con game giống y đúc với hiện tại
Cố gắng làm chuẩn giúp tôi nhé, tôi quý bạn
```

> Ghi chú: giữa Prompt 3 và 4, AI có hỏi bạn muốn nâng thời gian tìm/giới hạn Tùy chỉnh hay không; bạn không trả lời trực tiếp mà gửi Prompt 4 (hướng đi mới).

---

# PHẦN 2 – Prompt / đặc tả để tái tạo game y đúc

**Cách dùng:** copy toàn bộ khối từ "BẮT ĐẦU PROMPT" đến "KẾT THÚC PROMPT" gửi cho AI.
- Muốn **giống 100%**: gửi kèm **Phụ lục** (mã nguồn tham chiếu) ở cuối file này và dặn AI "sao chép chính xác".
- Muốn AI **tự viết lại theo đặc tả**: chỉ gửi khối prompt (đặc tả đã đủ chi tiết về luật, thuật toán, hằng số, giao diện, hành vi).

## ===== BẮT ĐẦU PROMPT =====

Hãy tạo game puzzle **"Queens – Đặt Tướng"** (kiểu LinkedIn Queens) chạy trên localhost, gồm `server.py` (chỉ dùng thư viện chuẩn Python 3, không cài thêm gì) và thư mục `static/`. Làm đúng từng chi tiết dưới đây; mọi giao diện bằng **tiếng Việt**.

### 0. Cấu trúc & cách chạy

```
queens/
  server.py            # http.server + API sinh màn
  README.md
  static/
    index.html  style.css  app.js  fonts.css
    fonts/ Baloo2-600.ttf Baloo2-800.ttf Nunito-600.ttf Nunito-800.ttf
```
- Chạy: `python3 server.py [--host 127.0.0.1] [--port 8000] [--open]` (mặc định 127.0.0.1:8000; `--open` tự mở trình duyệt sau 0,6s). In ra `♛ Queens đang chạy tại http://host:port/  (Ctrl+C để dừng)`; Ctrl+C in `Đã dừng server.` rồi thoát.
- Font: tải từ Google Fonts (Baloo 2 trọng số 600 & 800, Nunito 600 & 800, file `.ttf`) về `static/fonts/` và khai báo `@font-face` trong `static/fonts.css` (tự host, chạy offline, `font-display:swap`). Font hiển thị tốt tiếng Việt.
- **Quan trọng:** mọi URL phía client (CSS/JS/font/API) phải **tương đối** hoặc tính từ `location.pathname`, vì game có thể được mở qua reverse-proxy (vd. code-server `/proxy/8000/`). Không được dùng `/api/...` tuyệt đối (gây lỗi `Unexpected token 'N', "Not found." is not valid JSON`). Nếu phản hồi không phải JSON, báo: "Không kết nối được server game (hãy mở đúng địa chỉ chạy server.py)".

### 1. Luật (cố định, không cho chỉnh)
Lưới `R hàng × C cột`, chia thành `K` vùng màu **liền nhau** (kề cạnh), mỗi ô thuộc đúng 1 vùng. Phải đặt đúng `K` tướng sao cho:
1. Mỗi vùng có **đúng 1** tướng.
2. Mỗi hàng tối đa 1 tướng.
3. Mỗi cột tối đa 1 tướng.
4. 8 ô xung quanh một tướng (kể cả chéo) không có tướng khác.

Hai tướng **xung đột** nếu cùng hàng, cùng cột, cùng vùng, hoặc `|Δhàng|≤1 và |Δcột|≤1`. Người chơi **vẫn đặt được** quân vi phạm: quân đó đổi **màu đỏ** (`#ff3b5c`), nhấp nháy/phình nhịp, ô rung. Quân hợp lệ có **màu của vùng** (bản đậm hơn màu nền ô). Thắng khi đủ `K` tướng và **không** quân nào đỏ (chấp nhận mọi cách đặt hợp lệ, không chỉ đáp án của server).

### 2. Server (`server.py`)
`ThreadingHTTPServer` + `SimpleHTTPRequestHandler(directory=static)`; `/` → `index.html`; mọi phản hồi có `Cache-Control: no-store`; chỉ log các request `/api/`.

**API** `GET /api/puzzle?rows=&cols=&regions=[&mode=multi&min_region=&min_sols=&max_sols=]` → JSON (`ensure_ascii=False`):
`{rows, cols, regions, grid:[[id…]], solution:[[r,c]…], solutions:[[[r,c]…]…], unique:bool}`
- `grid[r][c]` = id vùng `0..K-1`; `solution` = K cặp `[r,c]` theo thứ tự id vùng (phần tử i là tướng của vùng i); `solutions` = mọi đáp án (chế độ cổ điển: chỉ `[solution]`).
- Validate: `rows,cols ∈ [4,14]` else 400 `{"error":"Kích thước lưới từ 4 đến 14"}`; `3 ≤ regions ≤ min(rows,cols,14)` else 400 `{"error":"Số vùng phải từ 3 đến {max}"}`; không phải số → 400 "Tham số không hợp lệ"; không sinh được → 422 "Không thể tạo màn với cấu hình này, hãy đổi số vùng/kích thước". `mode=multi`: `1≤min_region≤4`, `2≤min_sols≤max_sols≤50`, mặc định `2/2/6`.

**Thuật toán sinh (cổ điển, đáp án duy nhất khi có thể):**
1. `place_queens`: chọn ngẫu nhiên `K` hàng (sắp tăng), DFS gán cột ngẫu nhiên: cột chưa dùng, và nếu hàng liền trước có tướng thì `|Δcột|>1`. Thử tối đa 200 bộ hàng; thất bại → trả `None`.
2. `grow_regions`: mỗi tướng là hạt giống của 1 vùng; mỗi vùng có trọng số ngẫu nhiên `uniform(0.35,1.0)`; lặp: chọn vùng (có biên rỗng khác) theo `rng.choices` theo trọng số, lấy ngẫu nhiên 1 ô biên (hoán đổi với phần tử cuối rồi pop), nếu chưa gán thì gán và thêm các ô kề 4 hướng chưa gán vào biên.
3. `solve(grid,R,C,K,limit)`: backtracking **MRV** (chọn vùng chưa đặt có ít ô khả dụng nhất; ngắt sớm nếu ≤1), duy trì mảng `blocked[r][c]` đếm (cộng khi đặt: cả hàng, cả cột, 8 ô kề; trừ khi gỡ), dừng khi đủ `limit` nghiệm; trả danh sách nghiệm (mỗi nghiệm là list K ô theo id vùng).
4. `repair(...)` (tối đa 300 vòng, hạn chót theo thời gian): `sols=solve(limit=2)`; nếu không còn nghiệm nào khác nghiệm gốc (`target` = vị trí các tướng đã đặt) → duy nhất, xong. Ngược lại gom các ô tướng của nghiệm khác (không thuộc `target`), xáo trộn, thử chuyển một ô sang vùng kề khác (không phải ô target): phần bị tách rời của vùng cũ (không nối với tướng target của vùng đó, tính bằng `split_without` DFS) được **sáp nhập luôn** sang vùng mới để mọi vùng luôn liền; nếu không ô nào chuyển được → thất bại.
5. `generate`: lặp (đặt tướng → mọc vùng → repair) đến khi duy nhất hoặc hết ngân sách: **3,0 s** nếu `K == min(R,C)`, **0,8 s** nếu khác (rất khó duy nhất); hết giờ trả ứng viên đầu tiên (`unique:false`). Kết quả đo: 5×5, 8×8, 11×11, 12×12 luôn duy nhất; 14×14 ~50–80%; lưới lệch / K<min(R,C) gần như luôn nhiều đáp án.

**Thuật toán sinh màn "nâng cấp" (`generate_multi`, ngân sách 4,0 s):** không vùng nào nhỏ hơn `min_region` ô và số đáp án thuộc `[min_sols,max_sols]`:
1. Đặt tướng + `grow_regions`; nếu có vùng nhỏ hơn `min_region` → bỏ làm lại.
2. Vòng ≤400: `sols=solve(limit=max_sols+1)`; nếu `len ≤ max_sols` dừng. Ngược lại lấy các nghiệm khác `target`, xáo ô tướng không thuộc target, chuyển ô sang vùng kề (như trên, có sáp nhập phần tách rời); **nếu sau chuyển có vùng nhỏ hơn `min_region` thì hoàn tác** (sao lưu lưới), thử ô khác.
3. Nhận nếu `min_sols ≤ len(sols) ≤ max_sols` và mọi vùng ≥ `min_region`; trả `{grid, solution:sols[0], solutions:sols, unique:false}`. Hết giờ trả ứng viên tốt nhất tìm được.
(Lý do: lưới mọc ngẫu nhiên cỡ 9×9 trở lên có hàng chục nghiệm; phải "ép" về vài nghiệm để vừa nhiều đáp án vừa khó.)

### 3. Các màn chơi (hằng `LEVELS` đầu `app.js`)
| key | tên | lưới | vùng | màu thẻ | ghi chú |
|---|---|---|---|---|---|
| easy | Dễ | 5×5 | 5 | `#aaf0bf` | cổ điển |
| normal | Bình thường | 8×8 | 8 | `#ffe27a` | cổ điển |
| hard | Khó | 11×11 | 11 | `#ff9db6` | cổ điển |
| easy2 | Dễ+ | 6×6 | 6 | `#aaf0bf` | `plus:{min_region:2,min_sols:2,max_sols:3}` |
| normal2 | Bình thường+ | 9×9 | 9 | `#ffe27a` | `plus:{min_region:2,min_sols:2,max_sols:5}` |
| hard2 | Khó+ | 12×12 | 12 | `#ff9db6` | `plus:{min_region:2,min_sols:3,max_sols:8}` |

Thêm thẻ **Tùy chỉnh** (mặc định 9×9, 9 vùng; thanh trượt Hàng/Cột 4–14, Số vùng 3..min(hàng,cột,14); nhớ giá trị trong localStorage; bấm tiêu đề thẻ để mở/đóng; nút "Chơi!"). Màn có `plus` gọi API với `mode=multi&...` và ghi chú trong game: "Màn nâng cấp: không có vùng 1 ô và có nhiều cách đặt đúng — chỉ cần đặt đủ và đúng luật là thắng"; màn cổ điển duy nhất: "Chạm để đặt tướng · Chuột phải hoặc nút Đánh dấu để ghi chú ô trống"; màn cổ điển không duy nhất: "Màn này có thể có nhiều đáp án — đặt đúng luật là thắng!".

Hằng số: `TIME_LIMIT=900s`, `HINT_PENALTY=30s`, `STAR3_PER_REGION=15`, `STAR2_PER_REGION=40` (3★ nếu `t ≤ 15×K`, 2★ nếu `t ≤ 40×K`, ngược lại 1★; `t` đã gồm phạt gợi ý), `LIMITS={min:4,max:14}`.

Bảng 14 màu vùng (nền ô): `#a5c8ff #ffc98b #a6e3a1 #d4a5ff #fff09a #8fe3d8 #ff9fc6 #b5b9ff #c9e87a #9ad7f5 #e0b79b #d9d9d9 #f0c4e8 #85b8a0` (vùng i dùng màu `i % 14`). Màu quân = chuyển màu nền sang HSL, độ sáng 58%, độ bão hòa +30 (tối đa 100).

### 4. Luồng màn hình & hành vi
1. **Bắt đầu**: bàn cờ mini 5×5 xoay −3° (có 5 vương miện rơi vào lần lượt), tiêu đề "Queens" lớn (vàng, viền mực, đổ bóng cứng) + nhãn "ĐẶT TƯỚNG" nền mực nghiêng 1,5°, câu mô tả "Mỗi vùng màu một vị tướng. / Không chung hàng, không chung cột, không chạm nhau.", nút **Start** (to, vàng, lắc nhẹ định kỳ), nút **Hướng dẫn**, nút bật/tắt **Âm thanh** (nhớ trong localStorage). Hình trang trí nổi (5 hình tròn/vuông màu có viền) chỉ hiện ở màn này.
2. **Chọn độ khó**: tiêu đề "Chọn độ khó", nhóm "Cổ điển" (Dễ/Bình thường/Khó), nhóm "Nâng cấp · nhiều đáp án" (3 màn +), rồi thẻ Tùy chỉnh. Mỗi thẻ: chip tên, 3 sao (số sao đạt được kỷ lục), cỡ lưới lớn dạng `5×5`, hình xem trước (dải màu chéo `COLORS[min(K−1, floor((r+c)·K/(R+C−1)))]`, ô ≈ `max(5, floor(64/max(R,C)))`px), dòng "`K vùng`" (+ " · nhiều đáp án" với màn +) và "Kỷ lục mm:ss"/"Chưa chơi". Nút `←` về Bắt đầu, `?` mở Hướng dẫn.
3. **Game**: thanh trên (`←` thoát về chọn màn, tên màn + "R×C · K vùng", nút Tạm dừng); HUD 3 ô: đồng hồ `mm:ss` (đếm lên; ≥12:00 nền cam; ≥14:00 nền đỏ + rung), 3 sao hiện tại (sao mờ dần khi quá ngưỡng), số tướng `đã đặt/K`(nảy khi đổi); thanh tiến độ tới 15:00 (xanh→cam→đỏ); bàn cờ; 4 nút: **Hoàn tác** (Ctrl+Z), **Đánh dấu** (bật/tắt chế độ ✕), **Gợi ý (+30s)**, **Làm lại** (xóa hết quân/dấu, có thể hoàn tác); ghi chú ở dưới. Lúc vào có spinner "Đang tạo màn chơi…" (vương miện nhảy).
4. **Thao tác**: bấm ô trống → đặt tướng; bấm tướng → nhấc; bấm dấu ✕ → thành tướng. Chuột phải (hoặc chế độ Đánh dấu) → bật/tắt dấu ✕ trên ô trống/ô dấu (không tác dụng lên tướng). Rê chuột sáng hàng+cột. Mỗi thao tác có gợn sóng, âm thanh, `history` theo từng nhóm thay đổi để hoàn tác. Khi một quân **mới** thành đỏ: ô rung + âm "bad".
5. **Gợi ý**: chọn trong `solutions` đáp án trùng nhiều nhất với quân đang đặt; chọn ngẫu nhiên 1 tướng chưa đặt (ưu tiên cái không xung đột với quân người chơi), gỡ các quân đang xung đột với nó, đặt quân đó, ô phát sáng 3 lần, cộng 30 giây vào đồng hồ, toast "Đã đặt 1 tướng, cộng thêm 30 giây" (đã đúng hết: "Bạn đã đặt đúng hết rồi!").
6. **Tạm dừng**: dừng đồng hồ, che bàn cờ bằng tấm vàng sọc chéo "Tạm dừng" + nút "Tiếp tục"; đồng hồ dùng `performance.now()` (cộng dồn), chặn thao tác khi dừng.
7. **Thắng**: khóa bàn, các quân nhảy múa, confetti + âm thắng; sau ~1,1 s hiện modal: icon vương miện, "Chiến thắng!", 3 sao bật lần lượt (xoay vào, cách nhau 0,45 s, mỗi sao một nốt), câu động viên theo sao (3: "Tuyệt đỉnh! Bạn là tướng quân thực thụ!", 2: "Rất tốt! Thêm chút nữa là đủ ba sao.", 1: "Hoàn thành! Thử lại để nhanh hơn nhé.") + " Kỷ lục mới!" nếu phá kỷ lục; 3 ô: Thời gian / Kỷ lục / Gợi ý; nút **Ván mới** (cùng màn, màn mới) và **Chọn màn**. Lưu kỷ lục `queens.best.<RxCxK>` (thêm hậu tố `+` cho màn nâng cấp) = `{time, stars}` (thời gian thấp nhất, sao cao nhất), dùng try/catch quanh localStorage.
8. **Thua** (đồng hồ ≥ 15:00): modal đỏ "Hết giờ — Thua cuộc!", icon đồng hồ, "Bạn đã vượt quá 15 phút. Đừng nản, thử lại nhé!", Thời gian "15:00+".
9. **Hướng dẫn** (modal): "Đặt đủ mọi vị tướng…", mục "Luật chơi (cố định)" 4 luật đánh số, hình minh họa lưới 4×4 (tướng ở hàng 3 cột 2, ô bị chặn tô hồng gồm cả hàng, cả cột, 8 ô quanh), mục "Cách chơi", mục "Thời gian & sao" (nêu 15 s×K, 40 s×K, 15 phút, gợi ý +30 s), nút "Đã hiểu!". Esc / bấm nền để đóng.
10. Âm thanh WebAudio tự tổng hợp (không file): đặt (triangle 420→760 Hz), nhấc (sine 320→200), dấu (square 260), sai (sawtooth 170→110), gợi ý (880 rồi 1320), mỗi sao (660+220·i), thắng (C5 E5 G5 C6), thua (440 370 311 220), click nút (600). Confetti bằng canvas toàn màn hình.

### 5. Giao diện – phong cách "sticker" sáng
- Biến CSS: `--paper:#fff4dc` (nền kem + lưới chấm `radial-gradient(rgba(27,21,48,.13) 1.6px…)` 24px), `--ink:#1b1530`, `--ink2:#5b5273`, `--white:#fffdf7`, `--yellow:#ffd23f`, `--pink:#ff8fc0`, `--blue:#7cc8ff`, `--green:#8fe3a8`, `--purple:#c3a6ff`, `--orange:#ffa95c`, `--bad:#ff3b5c`; easing `cubic-bezier(.34,1.56,.64,1)`.
- Font: tiêu đề/nút/số = **Baloo 2** (800), nội dung = **Nunito** (600). Token: `--bw:2px` (viền), `--sh:3px` (bóng nút), `--sh-card:4px`, `--sh-board:5px`, `--btn-h:46px`, `--col-w:420px`. Mọi nút/thẻ/ô: viền 2px mực (bàn cờ, modal, tấm tạm dừng: 3px), bo góc lớn, **bóng đổ cứng không blur** (nút `0 3px 0`, thẻ `0 4px 0`, bàn cờ `0 5px 0`, modal `0 6px 0`); hover nhấc 2px và bóng dài thêm 2px; active lún 2px (bóng `0 1px 0`); gợn sóng (ripple) khi bấm.
- **Nhất quán nút:** mọi nút chuẩn cao tối thiểu `--btn-h` (nút icon vuông `--btn-h`); nút lớn Start cao 60px. Nút cùng nhóm cùng rộng: màn Bắt đầu = 3 nút xếp dọc cùng rộng 280px (Start, Hướng dẫn, Âm thanh cùng kích thước ngang); modal kết quả = lưới 2 cột bằng nhau (Ván mới / Chọn màn, không margin riêng lẻ); hàng công cụ = lưới 4 cột bằng nhau, cao 62px, nhãn "+30s" là huy hiệu góc phải trên nút Gợi ý; HUD = lưới 3 cột (`1.35fr 1fr 1fr`) cùng cao 48px; HUD, thanh tiến độ và hàng công cụ cùng bề rộng `min(100%, 420px)`.
- Icon: SVG nội tuyến (`<symbol>`): crown, star, back, pause, play, undo, x, bulb, reset, clock, help, vol, mute — **không dùng emoji**. Vương miện là đa giác 5 đỉnh + 3 chấm + đế, viền mực, tô `currentColor`.
- Bàn cờ: viền 3px mực, bo 20px, bóng cứng 5px; đường kẻ ô mảnh `rgba(27,21,48,.28)`, **viền dày 3px mực giữa hai vùng khác nhau** (chỉ vẽ bên phải/dưới); cỡ ô `--cell` tính theo cửa sổ: `max(22, floor(min((innerWidth−56 ≤640)/cols, (innerHeight−340)/rows, 64)))`px, cập nhật khi resize.
- Animation: màn hình trượt vào, bàn cờ xoay-phóng vào, ô hiện lan theo đường chéo (`(r+c)·22ms`), quân rơi từ trên xuống (nảy), rung ô sai, phát sáng gợi ý, quân nhảy khi thắng, sao xoay khi hiện, nút Start lắc, thẻ chọn màn nảy lên khi hover. Hỗ trợ `prefers-reduced-motion`. Responsive điện thoại (≥320px).

### 6. Tiêu chí nghiệm thu (hãy tự kiểm tra)
1. `python3 server.py` chạy; mở `/` thấy màn Bắt đầu; `curl "localhost:8000/api/puzzle?rows=5&cols=5&regions=5"` trả JSON đúng định dạng; tham số sai trả mã lỗi như trên.
2. Với Dễ/Bình thường/Khó (và 12×12), dùng **bộ giải độc lập** (vét cạn từng hàng) đếm đáp án: phải **đúng 1** (≥30 màn mỗi cỡ nhỏ). Mọi vùng liền nhau, đủ K vùng.
3. Màn +: ≥12 màn mỗi cấp qua API: số đáp án nằm trong khoảng cấu hình, mọi vùng ≥2 ô, vùng liền nhau, `len(solutions)` = số đếm độc lập; mỗi lần sinh < ~4 s.
4. Giao diện: chụp ảnh (headless Chrome) kiểm tra màn Bắt đầu, Chọn màn, Game (có quân đỏ), Hướng dẫn, Thua. Thử qua đường dẫn có tiền tố (`/proxy/8000/`) không lỗi API.
5. Đồng hồ/sao/thua 15 phút/phạt gợi ý hoạt động như mô tả.

## ===== KẾT THÚC PROMPT =====

---

# PHẦN 3 – Phong cách giao diện & prompt thiết kế dùng chung

Đã tách thành file riêng: [`UI_STYLE_GUIDE.md`](UI_STYLE_GUIDE.md) (phong cách giao diện + prompt thiết kế dùng chung cho mọi sản phẩm).

---

# PHỤ LỤC – Mã nguồn tham chiếu (trạng thái hiện tại)

> Dùng khi muốn AI tái tạo **giống 100%**: gửi kèm nguyên phụ lục này cùng prompt, yêu cầu "tạo đúng các file này, nội dung y hệt". Các file font `.ttf` tải từ Google Fonts như mục 0.

## `server.py`

~~~~python
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
~~~~

## `static/index.html`

~~~~html
<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#fff4dc">
<title>Queens – Đặt Tướng</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffd23f' stroke='%231b1530' stroke-width='1.4' stroke-linejoin='round' d='M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5z'/%3E%3C/svg%3E">
<link rel="stylesheet" href="fonts.css">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="bg"><i></i><i></i><i></i><i></i><i></i></div>

<main id="app">
  <!-- ============ MÀN HÌNH BẮT ĐẦU ============ -->
  <section id="screen-start" class="screen active">
    <div class="hero" id="hero" aria-hidden="true"></div>
    <h1><span class="t1">Queens</span><span class="t2">Đặt Tướng</span></h1>
    <p class="tagline">Mỗi vùng màu một vị tướng.<br>Không chung hàng, không chung cột, không chạm nhau.</p>
    <div class="stack">
      <button class="btn primary big" id="btn-start"><svg class="ic"><use href="#i-play"/></svg>Start</button>
      <button class="btn" id="btn-help"><svg class="ic"><use href="#i-help"/></svg>Hướng dẫn</button>
      <button class="btn" id="btn-sound"></button>
    </div>
  </section>

  <!-- ============ CHỌN MÀN ============ -->
  <section id="screen-levels" class="screen">
    <header class="bar">
      <button class="btn icon" data-go="screen-start" aria-label="Quay lại"><svg class="ic"><use href="#i-back"/></svg></button>
      <h2>Chọn độ khó</h2>
      <button class="btn icon" id="btn-help2" aria-label="Hướng dẫn"><svg class="ic"><use href="#i-help"/></svg></button>
    </header>
    <div class="levels" id="levels"></div>
  </section>

  <!-- ============ TRÒ CHƠI ============ -->
  <section id="screen-game" class="screen">
    <header class="bar">
      <button class="btn icon" id="btn-quit" aria-label="Thoát"><svg class="ic"><use href="#i-back"/></svg></button>
      <div class="titlebox"><b id="g-level">Dễ</b><small id="g-size">5×5 · 5 vùng</small></div>
      <button class="btn icon" id="btn-pause" aria-label="Tạm dừng"><svg class="ic"><use id="pause-use" href="#i-pause"/></svg></button>
    </header>

    <div class="hud">
      <div class="pill timer" id="timer"><svg class="ic"><use href="#i-clock"/></svg><span id="t-text">00:00</span></div>
      <div class="pill live-stars" id="live-stars" title="Số sao nếu hoàn thành ngay bây giờ">
        <svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg><svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg><svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg>
      </div>
      <div class="pill count"><svg class="ic crownic" viewBox="0 0 24 24"><use href="#crown"/></svg><b id="g-placed">0</b><span>/<span id="g-total">0</span></span></div>
    </div>
    <div class="timebar" title="Giới hạn 15:00"><i id="timebar"></i></div>

    <div class="board-wrap">
      <div id="board" class="board" role="grid"></div>
      <div id="pause-cover" class="pause-cover hidden">
        <div class="pc-t">Tạm dừng</div>
        <button class="btn primary" id="btn-resume"><svg class="ic"><use href="#i-play"/></svg>Tiếp tục</button>
      </div>
    </div>

    <footer class="tools">
      <button class="btn tool" id="btn-undo"><svg class="ic"><use href="#i-undo"/></svg><span>Hoàn tác</span></button>
      <button class="btn tool" id="btn-mark"><svg class="ic"><use href="#i-x"/></svg><span>Đánh dấu</span></button>
      <button class="btn tool" id="btn-hint"><svg class="ic"><use href="#i-bulb"/></svg><span>Gợi ý</span><em>+30s</em></button>
      <button class="btn tool" id="btn-restart"><svg class="ic"><use href="#i-reset"/></svg><span>Làm lại</span></button>
    </footer>
    <p class="note" id="g-note"></p>
  </section>
</main>

<!-- ============ HƯỚNG DẪN ============ -->
<div class="modal hidden" id="modal-help">
  <div class="card help">
    <h2>Hướng dẫn</h2>
    <p class="lead">Đặt <b>đủ mọi vị tướng</b> lên lưới. Số tướng bằng số vùng màu, mỗi vùng có đúng <b>1</b> tướng.</p>
    <h3>Luật chơi <em>(cố định)</em></h3>
    <ol class="rules">
      <li><span><b>Mỗi vùng màu</b> chỉ có <b>đúng 1</b> tướng.</span></li>
      <li><span><b>Mỗi hàng</b> chỉ có tối đa 1 tướng.</span></li>
      <li><span><b>Mỗi cột</b> chỉ có tối đa 1 tướng.</span></li>
      <li><span><b>8 ô xung quanh</b> một tướng (kể cả đường chéo) không được có tướng khác.</span></li>
    </ol>
    <div class="demo" aria-hidden="true">
      <div class="demo-grid"><i class=""></i><i class="c"></i><i class=""></i><i class=""></i><i class="c"></i><i class="c"></i><i class="c"></i><i class=""></i><i class="c"></i><i class="x"><svg viewBox="0 0 24 24"><use href="#crown"/></svg></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class="c"></i><i class=""></i></div>
      <p>Tướng chặn cả <b>hàng</b>, <b>cột</b> và <b>8 ô quanh</b> nó (vùng tô hồng).</p>
    </div>
    <h3>Cách chơi</h3>
    <ul>
      <li><b>Bấm / chạm</b> vào ô để đặt hoặc nhấc tướng.</li>
      <li><b>Chuột phải</b> (hoặc nút Đánh dấu) để ghi chú ô chắc chắn trống.</li>
      <li>Đặt sai luật vẫn được, nhưng tướng sẽ <b class="red">chuyển đỏ</b>. Tướng đúng luật mang màu của vùng.</li>
      <li>Thắng khi đặt đủ tướng và không có tướng nào đỏ.</li>
    </ul>
    <h3>Thời gian &amp; sao</h3>
    <ul>
      <li>Đồng hồ chạy từ lúc bắt đầu. <b>Quá 15 phút là thua.</b></li>
      <li>3 sao nếu xong trong <b>15 giây × số vùng</b>; 2 sao trong <b>40 giây × số vùng</b>; còn lại 1 sao.</li>
      <li>Mỗi lần dùng gợi ý bị cộng thêm 30 giây.</li>
    </ul>
    <button class="btn primary wide" data-close>Đã hiểu!</button>
  </div>
</div>

<!-- ============ KẾT QUẢ ============ -->
<div class="modal hidden" id="modal-result">
  <div class="card result">
    <div class="res-icon" id="res-icon"><svg viewBox="0 0 24 24"><use href="#crown"/></svg></div>
    <h2 id="res-title">Chiến thắng!</h2>
    <div class="stars" id="res-stars">
      <svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg><svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg><svg class="star" viewBox="0 0 24 24"><use href="#i-star"/></svg>
    </div>
    <p id="res-msg" class="res-msg"></p>
    <div class="res-stats">
      <div><small>Thời gian</small><b id="res-time">00:00</b></div>
      <div><small>Kỷ lục</small><b id="res-best">--:--</b></div>
      <div><small>Gợi ý</small><b id="res-hints">0</b></div>
    </div>
    <div class="stack row">
      <button class="btn primary" id="res-again">Ván mới</button>
      <button class="btn" id="res-menu">Chọn màn</button>
    </div>
  </div>
</div>

<div id="loading" class="loading hidden"><div class="spin"><svg viewBox="0 0 24 24"><use href="#crown"/></svg></div><p>Đang tạo màn chơi…</p></div>
<div id="toast" class="toast"></div>
<canvas id="fx"></canvas>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="crown" viewBox="0 0 24 24">
    <g fill="currentColor" stroke="#1b1530" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
      <path d="M2.8 7.8l4.6 4 4.6-7.2 4.6 7.2 4.6-4-2 11.2H4.8z"/>
      <circle cx="2.8" cy="7" r="1.5"/><circle cx="12" cy="3.7" r="1.5"/><circle cx="21.2" cy="7" r="1.5"/>
      <rect x="4.6" y="19.4" width="14.8" height="2.3" rx="1.1"/>
    </g>
  </symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z"/></symbol>
  <symbol id="i-back" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></symbol>
  <symbol id="i-pause" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4.5l12 7.5-12 7.5z" fill="currentColor"/></symbol>
  <symbol id="i-undo" viewBox="0 0 24 24"><path d="M9 14L4 9l5-5M4 9h10.5a5.5 5.5 0 010 11H11"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9.5 18h5M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0012 3z"/></symbol>
  <symbol id="i-reset" viewBox="0 0 24 24"><path d="M4 12a8 8 0 103-6.2M4 4v5h5"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 8.5V13l3 2M9 2.5h6"/></symbol>
  <symbol id="i-help" viewBox="0 0 24 24"><path d="M9 9a3 3 0 116 0c0 2-3 2.5-3 4.5M12 18h.01"/></symbol>
  <symbol id="i-vol" viewBox="0 0 24 24"><path d="M4 9.5v5h4l5 4v-13l-5 4zM16.5 9a4 4 0 010 6M19 6.5a8 8 0 010 11"/></symbol>
  <symbol id="i-mute" viewBox="0 0 24 24"><path d="M4 9.5v5h4l5 4v-13l-5 4zM17 9.5l5 5M22 9.5l-5 5"/></symbol>
</svg>
<script src="app.js"></script>
</body>
</html>
~~~~

## `static/style.css`

~~~~css
/* Phong cách "sticker": nền kem, viền mực đậm, bóng đổ cứng */
:root{
  --paper:#fff4dc; --ink:#1b1530; --ink2:#5b5273; --white:#fffdf7;
  --yellow:#ffd23f; --pink:#ff8fc0; --blue:#7cc8ff; --green:#8fe3a8; --purple:#c3a6ff; --orange:#ffa95c;
  --bad:#ff3b5c; --cell:48px;
  --bw:2px; --sh:3px; --sh-card:4px; --sh-board:5px; --btn-h:46px; --col-w:420px;
  --display:"Baloo 2","Nunito",system-ui,sans-serif; --body:"Nunito",system-ui,-apple-system,"Segoe UI",sans-serif;
  --bounce:cubic-bezier(.34,1.56,.64,1);
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;min-height:100%}
body{font-family:var(--body);font-weight:600;color:var(--ink);background-color:var(--paper);
  background-image:radial-gradient(rgba(27,21,48,.13) 1.6px,transparent 1.7px);background-size:24px 24px;
  overflow-x:hidden;user-select:none;-webkit-user-select:none}
h1,h2,h3,.btn,.pill,b{font-family:var(--display)}
b{font-weight:800}
.hidden{display:none!important}
.ic{width:1.35em;height:1.35em;fill:none;stroke:currentColor;stroke-width:2.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.ic.crownic{stroke:none;width:1.5em;height:1.5em;color:var(--pink)}
.star{width:1em;height:1em;fill:var(--yellow);stroke:var(--ink);stroke-width:1.7;stroke-linejoin:round;transition:fill .3s,transform .3s}
.star.off{fill:#e6dcc3;transform:scale(.85)}

/* nền: hình dán trôi nổi */
.bg{position:fixed;inset:0;overflow:hidden;z-index:0;pointer-events:none;opacity:0;transition:opacity .4s}
body.on-start .bg{opacity:1}
.bg i{position:absolute;border:var(--bw) solid var(--ink);opacity:.9;animation:drift 14s ease-in-out infinite alternate}
.bg i:nth-child(1){width:64px;height:64px;border-radius:50%;background:var(--pink);left:6%;top:12%}
.bg i:nth-child(2){width:48px;height:48px;border-radius:12px;background:var(--blue);right:8%;top:20%;animation-delay:-4s;transform:rotate(12deg)}
.bg i:nth-child(3){width:80px;height:80px;border-radius:50%;background:var(--green);left:-24px;bottom:18%;animation-delay:-8s}
.bg i:nth-child(4){width:56px;height:56px;border-radius:14px;background:var(--yellow);right:4%;bottom:10%;animation-delay:-2s}
.bg i:nth-child(5){width:36px;height:36px;border-radius:50%;background:var(--purple);left:44%;top:3%;animation-delay:-6s}
@keyframes drift{to{transform:translate(18px,-26px) rotate(25deg)}}

#app{position:relative;z-index:1;min-height:100vh;max-width:600px;margin:0 auto;padding:14px 16px 28px}
.screen{display:none;flex-direction:column;align-items:center;min-height:calc(100vh - 42px)}
.screen.active{display:flex;animation:screenIn .45s var(--bounce)}
@keyframes screenIn{from{opacity:0;transform:translateY(20px) scale(.97)}}

/* ---------- nút ---------- */
.btn{font-size:1.05rem;font-weight:800;color:var(--ink);background:var(--white);border:var(--bw) solid var(--ink);border-radius:16px;
  padding:9px 22px;cursor:pointer;position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 var(--sh) 0 var(--ink);min-height:var(--btn-h);transition:transform .12s var(--bounce),box-shadow .12s,background .15s;line-height:1.2}
.btn:hover{transform:translateY(-2px);box-shadow:0 calc(var(--sh) + 2px) 0 var(--ink)}
.btn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ink)}
.btn:disabled{opacity:.4;pointer-events:none}
.btn.primary{background:var(--yellow)}
.btn.big{font-size:1.9rem;padding:8px 54px 4px;border-radius:22px;box-shadow:0 4px 0 var(--ink);min-height:60px;animation:wiggle 2.6s ease-in-out infinite}
.btn.big:hover{box-shadow:0 6px 0 var(--ink)}
.btn.big:active{box-shadow:0 1px 0 var(--ink);transform:translateY(3px)}
.btn.big .ic{width:1.1em;height:1.1em;margin-top:-4px}
@keyframes wiggle{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-2.5deg) scale(1.03)}94%{transform:rotate(2.5deg) scale(1.03)}}
.btn.icon{width:var(--btn-h);height:var(--btn-h);padding:0;border-radius:14px;font-size:1rem}
.btn.wide{width:100%}
.btn.on{background:var(--ink);color:var(--yellow)}
.ripple{position:absolute;border-radius:50%;background:rgba(27,21,48,.16);transform:scale(0);animation:ripple .55s ease-out forwards;pointer-events:none}
@keyframes ripple{to{transform:scale(4);opacity:0}}

/* ---------- màn bắt đầu ---------- */
#screen-start{justify-content:center;text-align:center}
.hero{display:grid;grid-template-columns:repeat(5,var(--hc,52px));grid-template-rows:repeat(5,var(--hc,52px));border:3px solid var(--ink);border-radius:20px;
  overflow:hidden;box-shadow:0 var(--sh-board) 0 var(--ink);transform:rotate(-3deg);margin-bottom:26px;animation:heroIn .8s var(--bounce)}
@keyframes heroIn{from{opacity:0;transform:rotate(-14deg) scale(.5)}}
.hero i{display:grid;place-items:center;background:var(--bg);border-right:1px solid rgba(27,21,48,.25);border-bottom:1px solid rgba(27,21,48,.25)}
.hero i.br{border-right:3px solid var(--ink)}.hero i.bb{border-bottom:3px solid var(--ink)}
.hero svg{width:78%;height:78%;color:var(--pc);filter:drop-shadow(0 2px 0 rgba(27,21,48,.25));animation:place .6s var(--bounce) backwards;animation-delay:calc(var(--d) * 1ms + 500ms)}
h1{margin:0;line-height:.85;display:flex;flex-direction:column;align-items:center}
h1 .t1{font-size:clamp(4rem,19vw,6.4rem);font-weight:800;letter-spacing:1px;color:var(--yellow);
  -webkit-text-stroke:3px var(--ink);paint-order:stroke fill;text-shadow:0 6px 0 var(--ink);animation:titleIn .7s var(--bounce) .1s backwards}
h1 .t2{font-size:clamp(1.3rem,6vw,1.9rem);font-weight:800;letter-spacing:.32em;text-indent:.32em;text-transform:uppercase;color:var(--white);background:var(--ink);
  padding:6px 18px 2px;border-radius:12px;margin-top:16px;transform:rotate(1.5deg);animation:titleIn .7s var(--bounce) .25s backwards}
@keyframes titleIn{from{opacity:0;transform:translateY(-30px) scale(.8)}}
.tagline{color:var(--ink2);font-size:1.05rem;line-height:1.5;margin:20px 0 26px;max-width:420px}
.stack{display:flex;flex-direction:column;gap:14px;align-items:stretch;width:min(100%,280px)}
.stack .btn{width:100%}
.stack.row{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%}

/* ---------- thanh trên ---------- */
.bar{display:flex;align-items:center;justify-content:space-between;width:100%;gap:10px;margin-bottom:12px}
.bar h2{margin:0;font-size:1.9rem;font-weight:800;line-height:1}
.titlebox{text-align:center;line-height:1}
.titlebox b{font-size:1.7rem;display:block}.titlebox small{color:var(--ink2);font-weight:800;font-size:.95rem}

/* ---------- chọn màn ---------- */
.levels{display:grid;gap:18px;width:100%;margin-top:6px}
.lv{background:var(--tone);border:var(--bw) solid var(--ink);border-radius:26px;padding:16px 18px 14px;cursor:pointer;box-shadow:0 var(--sh-card) 0 var(--ink);
  transition:transform .15s var(--bounce),box-shadow .15s;animation:cardIn .5s var(--bounce) backwards;position:relative}
.lv:nth-child(2){animation-delay:.07s}.lv:nth-child(3){animation-delay:.14s}.lv:nth-child(4){animation-delay:.21s}
@keyframes cardIn{from{opacity:0;transform:translateY(26px) rotate(1.5deg)}}
.lv:hover{transform:translateY(-3px) rotate(-.6deg);box-shadow:0 7px 0 var(--ink)}
.lv:active{transform:translateY(3px);box-shadow:0 1px 0 var(--ink)}
.lv-top,.lv-foot{display:flex;align-items:center;justify-content:space-between;gap:8px}
.chip{background:var(--ink);color:var(--white);font-family:var(--display);font-weight:800;font-size:1rem;letter-spacing:.14em;text-transform:uppercase;padding:3px 14px 0;border-radius:99px}
.mini-stars{display:flex;gap:1px;font-size:1.5rem}
.lv-main{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:4px 0 6px}
.lv-size{font-family:var(--display);font-weight:800;font-size:4.2rem;line-height:1;letter-spacing:-2px;white-space:nowrap}
.lv-size small{font-size:.55em;opacity:.55;margin:0 .08em;letter-spacing:0}
.lv-prev{display:grid;border:var(--bw) solid var(--ink);border-radius:10px;overflow:hidden;background:var(--ink);flex:none}
.lv-prev i{background:var(--bg);width:var(--pc);height:var(--pc)}
.lv:hover .lv-prev{animation:tilt .5s}
@keyframes tilt{40%{transform:rotate(6deg) scale(1.06)}}
.lv-foot{font-weight:800;font-size:.95rem}
.lv-foot span:first-child{font-family:var(--display);font-size:1.1rem}
.lv-foot span:last-child{background:rgba(255,253,247,.7);border:2px solid var(--ink);border-radius:99px;padding:1px 10px}
.lv.custom-lv{cursor:default}
.lv.custom-lv .lv-head{cursor:pointer}
.custom{display:none;margin-top:12px;gap:12px;flex-direction:column}
.lv.open .custom{display:flex}
.custom label{display:grid;grid-template-columns:78px 1fr 34px;align-items:center;gap:10px;font-family:var(--display);font-weight:800;font-size:1.1rem}
.custom label b{background:var(--white);border:2px solid var(--ink);border-radius:10px;text-align:center;line-height:1.5}
.custom input[type=range]{width:100%;accent-color:var(--ink);height:26px}
.chev{transition:transform .25s var(--bounce);display:inline-block}
.lv.open .chev{transform:rotate(180deg)}

/* ---------- HUD ---------- */
.hud{display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:10px;width:min(100%,var(--col-w));margin-bottom:10px}
.pill{background:var(--white);border:var(--bw) solid var(--ink);border-radius:16px;box-shadow:0 var(--sh) 0 var(--ink);padding:3px 10px 0;display:flex;align-items:center;justify-content:center;gap:8px;min-width:0;
  font-weight:800;font-size:1.5rem;line-height:1.3;height:48px}
.pill .ic{margin-top:-3px}
.timer{font-variant-numeric:tabular-nums;font-size:1.9rem;transition:background .3s}
.timer span{letter-spacing:1px;min-width:3.3ch}
.timer.warn{background:var(--orange)}
.timer.danger{background:var(--bad);color:#fff;animation:shakeT .5s infinite}
@keyframes shakeT{25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}
.live-stars{gap:2px;font-size:1.7rem;padding:0 12px}
.live-stars .star{margin-top:-4px}
.count{font-size:1.4rem}.count span{color:var(--ink2)}
.count.bump{animation:bump .3s var(--bounce)}
@keyframes bump{50%{transform:scale(1.2) rotate(-3deg)}}
.timebar{width:min(100%,var(--col-w));height:14px;border:var(--bw) solid var(--ink);border-radius:10px;background:var(--white);overflow:hidden;margin-bottom:16px}
.timebar i{display:block;height:100%;width:0;background:var(--green);border-right:3px solid var(--ink);transition:width .3s linear,background .5s}
.timebar i.warn{background:var(--orange)}.timebar i.danger{background:var(--bad)}

/* ---------- bàn chơi ---------- */
.board-wrap{position:relative;padding:4px 4px 10px}
.board{display:grid;grid-template-columns:repeat(var(--cols),var(--cell));grid-template-rows:repeat(var(--rows),var(--cell));
  border:3px solid var(--ink);border-radius:20px;overflow:hidden;background:var(--ink);box-shadow:0 var(--sh-board) 0 var(--ink);animation:boardIn .6s var(--bounce)}
@keyframes boardIn{from{opacity:0;transform:scale(.8) rotate(-2deg)}}
.cell{position:relative;display:grid;place-items:center;padding:0;margin:0;border:0;cursor:pointer;color:inherit;
  background:var(--bg);border-right:1px solid rgba(27,21,48,.28);border-bottom:1px solid rgba(27,21,48,.28);
  transition:filter .15s,transform .12s;animation:cellIn .4s backwards;animation-delay:calc((var(--r) + var(--c)) * 22ms)}
@keyframes cellIn{from{opacity:0;transform:scale(.3)}}
.cell.br{border-right:3px solid var(--ink)}
.cell.bb{border-bottom:3px solid var(--ink)}
.cell:hover{filter:brightness(1.07) saturate(1.15);z-index:2}
.cell.hl::before{content:"";position:absolute;inset:0;background:rgba(255,253,247,.4);pointer-events:none}
.cell:active{transform:scale(.88)}
.cell.shake{animation:shake .45s}
@keyframes shake{20%{transform:translateX(-4px) rotate(-3deg)}40%{transform:translateX(4px) rotate(3deg)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
.cell.hint{animation:hintGlow 1s ease-in-out 3}
@keyframes hintGlow{50%{box-shadow:inset 0 0 0 4px var(--ink),0 0 0 3px var(--yellow);z-index:3}}
.cell .rp{position:absolute;border-radius:50%;background:rgba(255,253,247,.85);width:var(--cell);height:var(--cell);
  left:50%;top:50%;margin:calc(var(--cell) / -2) 0 0 calc(var(--cell) / -2);transform:scale(0);animation:ripple .5s ease-out forwards;pointer-events:none}
.piece{width:80%;height:80%;color:var(--pc);filter:drop-shadow(0 2px 0 rgba(27,21,48,.3));animation:place .5s var(--bounce);transition:color .25s;pointer-events:none}
.piece svg{width:100%;height:100%;display:block}
.piece.bad{color:var(--bad);animation:badPulse .9s ease-in-out infinite}
@keyframes place{0%{transform:translateY(-200%) scale(1.8) rotate(-20deg);opacity:0}60%{transform:translateY(8%) scale(.85)}100%{transform:none;opacity:1}}
@keyframes badPulse{50%{transform:scale(1.12) rotate(-4deg)}}
.mark{font-family:var(--display);font-weight:800;font-size:calc(var(--cell) * .5);line-height:1;color:rgba(27,21,48,.45);animation:markIn .25s var(--bounce);pointer-events:none}
@keyframes markIn{from{transform:scale(0) rotate(-90deg)}}
.cell.won .piece{animation:winDance .9s ease-in-out infinite;animation-delay:calc(var(--i) * 80ms)}
@keyframes winDance{50%{transform:translateY(-16%) scale(1.18) rotate(7deg)}}
.pause-cover{position:absolute;inset:4px 4px 10px;border-radius:20px;border:3px solid var(--ink);background:var(--yellow);
  background-image:repeating-linear-gradient(45deg,transparent 0 16px,rgba(27,21,48,.07) 16px 32px);
  display:flex;flex-direction:column;gap:16px;align-items:center;justify-content:center;z-index:5;animation:screenIn .3s var(--bounce)}
.pc-t{font-family:var(--display);font-weight:800;font-size:2.6rem}

.tools{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px;width:min(100%,var(--col-w))}
.btn.tool{flex-direction:column;gap:0;padding:4px 2px 3px;min-width:0;height:62px;font-size:.8rem;border-radius:16px}
.btn.tool .ic{width:1.7em;height:1.7em;margin-bottom:1px}
.btn.tool em{position:absolute;top:2px;right:2px;font-style:normal;background:var(--yellow);border-radius:6px;padding:0 3px;font-size:.62rem;line-height:1.35;border:1.5px solid var(--ink)}
.note{color:var(--ink2);font-size:.88rem;margin:14px 0 0;text-align:center;max-width:420px}

/* ---------- modal ---------- */
.modal{position:fixed;inset:0;z-index:50;background:rgba(27,21,48,.55);display:grid;place-items:center;padding:16px;animation:fade .25s}
@keyframes fade{from{opacity:0}}
.card{background:var(--paper);border:3px solid var(--ink);border-radius:28px;padding:24px 22px;max-width:480px;width:100%;max-height:92vh;overflow:auto;
  box-shadow:0 6px 0 var(--ink);animation:pop .5s var(--bounce)}
@keyframes pop{from{opacity:0;transform:scale(.6) translateY(40px) rotate(-3deg)}}
.card h2{margin:0 0 6px;font-size:2.2rem;font-weight:800;line-height:1.1}
.card h3{margin:20px 0 8px;font-size:1.35rem;font-weight:800;display:inline-block;background:var(--pink);border:var(--bw) solid var(--ink);border-radius:12px;padding:1px 12px 0;transform:rotate(-1.2deg)}
.card h3 em{font-style:normal;font-family:var(--body);font-weight:700;font-size:.8em}
.card .lead{margin:0;font-size:1.05rem;line-height:1.5}
.card .btn.primary.wide{margin-top:18px}
.card .stack.row{margin-top:4px}
.card ul{padding-left:20px;line-height:1.6;margin:6px 0}
.card li{margin:3px 0}
.card .red{color:var(--bad)}
.rules{list-style:none;counter-reset:r;padding:0!important;margin:6px 0}
.rules li span{flex:1}
.rules li{counter-increment:r;display:flex;gap:10px;align-items:flex-start;background:var(--white);border:var(--bw) solid var(--ink);border-radius:14px;padding:8px 12px;margin:8px 0;line-height:1.4}
.rules li::before{content:counter(r);flex:none;width:28px;height:28px;border-radius:50%;background:var(--yellow);border:var(--bw) solid var(--ink);display:grid;place-items:center;font-family:var(--display);font-weight:800;line-height:1;padding-top:3px}
.demo{display:flex;align-items:center;gap:14px;background:var(--white);border:var(--bw) dashed var(--ink);border-radius:16px;padding:12px}
.demo p{margin:0;font-size:.92rem;line-height:1.4}
.demo-grid{display:grid;grid-template-columns:repeat(4,32px);grid-template-rows:repeat(4,32px);gap:3px;flex:none}
.demo-grid i{background:var(--blue);border-radius:6px;border:2px solid var(--ink);display:grid;place-items:center}
.demo-grid i.c{background:var(--pink)}
.demo-grid i.x{background:var(--yellow)}
.demo-grid svg{width:24px;height:24px;color:var(--purple)}
.result{text-align:center}
.res-icon{width:92px;height:92px;margin:-4px auto 8px;border-radius:50%;background:var(--yellow);border:3px solid var(--ink);display:grid;place-items:center;box-shadow:0 3px 0 var(--ink);animation:float 2.4s ease-in-out infinite;color:var(--pink)}
.res-icon svg{width:58px;height:58px}
.res-icon .ic{width:54px;height:54px;color:var(--ink)}
@keyframes float{50%{transform:translateY(-8px) rotate(-5deg)}}
.result h2{font-size:2.6rem}
.stars{display:flex;justify-content:center;gap:6px;font-size:4rem;margin:2px 0 4px}
.stars .star{fill:#e6dcc3;transform:scale(.7);transition:none}
.stars .star:nth-child(2){margin-top:-14px}
.stars .star.on{fill:var(--yellow);animation:starPop .7s var(--bounce) forwards;animation-delay:var(--d)}
@keyframes starPop{0%{transform:scale(0) rotate(-180deg)}100%{transform:scale(1) rotate(0)}}
.res-msg{margin:0 0 14px;font-size:1.05rem;line-height:1.4}
.res-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.res-stats div{background:var(--white);border:var(--bw) solid var(--ink);border-radius:16px;padding:6px 4px 4px;box-shadow:0 2px 0 var(--ink)}
.res-stats small{display:block;color:var(--ink2);font-size:.78rem;font-weight:800}.res-stats b{font-size:1.6rem;font-variant-numeric:tabular-nums;line-height:1.2}
.result.lose .stars{display:none}
.result.lose .res-icon{background:var(--bad);color:#fff}
.result.lose h2{color:var(--bad)}

.loading{position:fixed;inset:0;z-index:80;background:rgba(255,244,220,.9);display:grid;place-content:center;justify-items:center;gap:10px;font-family:var(--display);font-weight:800;font-size:1.3rem}
.spin{width:72px;height:72px;color:var(--yellow);animation:jump .7s ease-in-out infinite}
.spin svg{width:100%;height:100%}
@keyframes jump{50%{transform:translateY(-18px) rotate(10deg)}}
.toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,140px);background:var(--ink);color:var(--paper);padding:10px 20px 8px;border-radius:16px;
  font-family:var(--display);font-weight:800;font-size:1.05rem;z-index:90;box-shadow:0 5px 0 rgba(27,21,48,.3);transition:transform .35s var(--bounce);max-width:90vw;text-align:center}
.toast.show{transform:translate(-50%,0)}
#fx{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60}
@media (max-width:480px){.lv-size{font-size:3.5rem}.pill{font-size:1.2rem}.timer{font-size:1.55rem}.hud{gap:8px}.pill .ic{width:1.15em;height:1.15em}.btn.tool{font-size:.74rem}.card{padding:20px 16px}}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important}}

.grp{font-size:1.15rem;font-weight:800;margin:10px 0 -6px;letter-spacing:.04em;text-transform:uppercase;color:var(--ink2)}
.grp.plus{margin-top:20px}
.grp::after{content:"";display:block;height:3px;background:var(--ink);opacity:.15;border-radius:3px;margin-top:4px}
@media (max-width:480px){.live-stars{font-size:1.25rem;padding:0 4px;gap:0}.count{font-size:1.2rem}}
~~~~

## `static/fonts.css`

~~~~css
@font-face{font-family:'Baloo 2';font-weight:600;font-style:normal;font-display:swap;src:url(fonts/Baloo2-600.ttf) format('truetype')}
@font-face{font-family:'Baloo 2';font-weight:800;font-style:normal;font-display:swap;src:url(fonts/Baloo2-800.ttf) format('truetype')}
@font-face{font-family:'Nunito';font-weight:600;font-style:normal;font-display:swap;src:url(fonts/Nunito-600.ttf) format('truetype')}
@font-face{font-family:'Nunito';font-weight:800;font-style:normal;font-display:swap;src:url(fonts/Nunito-800.ttf) format('truetype')}
~~~~

## `static/app.js`

~~~~js
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
~~~~

## `README.md`

~~~~markdown
# Queens – Đặt Tướng
    python3 server.py            # http://127.0.0.1:8000   (--port, --host, --open)
Không cần cài thêm thư viện (chỉ Python 3 chuẩn).
- Cấu hình màn Dễ / Bình thường / Khó: hằng `LEVELS` đầu file static/app.js
- Ngưỡng sao, thời gian giới hạn, phạt gợi ý: các hằng ngay bên dưới đó
- Sinh màn (đáp án duy nhất): server.py → `generate()`
~~~~
