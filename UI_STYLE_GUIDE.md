# Phong cách giao diện (Neo-brutalism / sticker UI) & prompt thiết kế dùng chung

Tài liệu độc lập: mô tả phong cách giao diện của game Queens – Đặt Tướng và một prompt mẫu để AI làm giao diện cho **bất kỳ sản phẩm nào** (app, web, game, dashboard…).

Mục lục: 3.1 Phong cách · 3.2 Điểm cần chỉnh · 3.3 Prompt chung.

## 3.1 Phong cách của game là gì?

Phong cách này là **Neo-brutalism** ở bản mềm, vui nhộn kiểu hoạt hình. Có thể gọi là "sticker UI": mọi thứ trông như miếng dán dán lên giấy.

| Thành phần | Giá trị trong game |
|---|---|
| **Nền** | Kem ấm `#fff4dc`, thêm lưới chấm mờ 24px (`radial-gradient(rgba(27,21,48,.13) 1.6px, transparent)`). Nền giống giấy, không dùng gradient. |
| **Màu mực** | Tím đen `#1b1530` cho viền, chữ và bóng. Không dùng đen thuần. Chữ phụ `#5b5273`, nền thẻ trắng ngà `#fffdf7`. |
| **Màu nhấn** | Pastel bão hòa vừa: vàng `#ffd23f`, hồng `#ff8fc0`, xanh dương `#7cc8ff`, xanh lá `#8fe3a8`, tím `#c3a6ff`, cam `#ffa95c`. Đỏ `#ff3b5c` chỉ dùng cho trạng thái sai. |
| **Viền** | 2px mực quanh mọi thứ bấm được và mọi thẻ; 3px cho các khối lớn (bàn cờ, modal). |
| **Bóng** | Bóng cứng, không blur: `0 3px 0 mực` cho nút, `0 4px 0` cho thẻ, `0 5px 0` cho bàn cờ, `0 6px 0` cho modal. Hover: nhấc lên 2px và bóng dài thêm 2px. Active: lún xuống 2px và bóng còn `0 1px 0`. |
| **Bo góc** | Lớn: 14px (nút), 16px (ô HUD), 20–28px (bàn cờ, thẻ, modal). |
| **Chữ** | **Baloo 2** đậm (tròn, dày) cho tiêu đề, nút và số. **Nunito** cho nội dung. Cả hai tự host trong `static/fonts/`. |
| **Icon** | SVG nội tuyến, nét 2.8px, đầu tròn. Không dùng emoji. |

Hai thứ khiến phong cách này trông "đắt":
- **Nghịch xoay nhẹ:** thành phần nghiêng 1 đến 3 độ (bàn cờ minh họa −3°, nhãn "ĐẶT TƯỚNG" +1,5°, tiêu đề mục −1,2°).
- **Chuyển động có nảy:** hầu hết hoạt ảnh dùng cùng một đường cong `cubic-bezier(.34,1.56,.64,1)` (vọt quá rồi nảy lại): màn hình trượt vào, thẻ nảy lên, quân rơi xuống, sao xoay vào, nút lún rồi bật.

Các hoạt ảnh nổi bật trong game: ô hiện lan theo đường chéo, quân rơi từ trên xuống, rung khi sai, phát sáng khi gợi ý, quân nhảy múa khi thắng, sao xoay vào lần lượt, nút Start lắc nhẹ định kỳ, gợn sóng khi bấm nút, confetti.

## 3.2 Điểm đã nhận ra và cách đã sửa trong code

Những điểm này đã được sửa trong game, và cũng chính là lý do prompt ở 3.3 có phần "hệ thống thành phần" và "tự kiểm tra":
- **Bóng và viền dày:** trước đây viền 3–4px cộng bóng cứng 4–10px bằng mực đặc làm giao diện nặng. Đã chỉnh: viền 2px (khối lớn 3px), bóng 3px (nút), 4px (thẻ), 5px (bàn cờ), 6px (modal).
- **Nút cùng hàng lệch nhau (đã sửa):**
  - Modal kết quả: `.card .btn.primary` có `margin-top:18px` nên "Ván mới" thấp hơn "Chọn màn". Đã bỏ margin riêng lẻ, dùng lưới 2 cột bằng nhau.
  - Chiều rộng nút phụ thuộc chữ bên trong. Đã chuyển nhóm nút sang lưới chia cột đều (4 nút công cụ, 2 nút kết quả, 3 ô HUD) và đặt cùng chiều rộng cho 3 nút ở màn Bắt đầu.
  - Mọi nút chuẩn dùng chung chiều cao tối thiểu `--btn-h` (46px).
- **Nguyên tắc nên theo:** nút cùng một hàng thì cùng chiều cao và chiều rộng (hoặc chia đều cả hàng). Nút chính và nút phụ chỉ khác màu nền hoặc hiệu ứng, không khác kích thước. Các nhóm khác nhau có thể khác cỡ, miễn là trong từng nhóm nhất quán.

## 3.3 Prompt chung để AI làm giao diện

Điểm mấu chốt: bắt AI **chốt bộ token thiết kế trước, rồi mới viết giao diện**, và bắt nó tự kiểm tra bằng checklist.

### ===== BẮT ĐẦU PROMPT GIAO DIỆN =====

```
Hãy thiết kế giao diện cho [LOẠI SẢN PHẨM: app/web/game/dashboard…] theo phong cách
[PHONG CÁCH: ví dụ "Neo-brutalism mềm, vui nhộn, như miếng dán"].

BƯỚC 1 – Chốt bộ token trước khi viết bất kỳ giao diện nào, và liệt kê ra:
- Màu: nền, mực (không dùng đen thuần), 1 màu chính, 4–5 màu phụ, 1 màu cảnh báo
  (chỉ dùng cho trạng thái lỗi/sai). Giá trị hex cụ thể.
- Chữ: 1 font hiển thị cho tiêu đề/số, 1 font cho nội dung; hỗ trợ [NGÔN NGỮ].
  Thang cỡ chữ (ví dụ 12/14/16/20/28/40). Tải font về tự host.
- Viền: độ dày [2/3]px. Bo góc: 3 mức (nhỏ/vừa/lớn).
- Bóng: kiểu [cứng không blur / mềm], độ lệch [2–4]px, độ đặc [85–100]%.
  Bóng thẻ = 1,5 × bóng nút.
- Khoảng cách: thang 4/8/12/16/24/32px. Chỉ dùng các giá trị này.
- Chuyển động: 1 đường cong easing, 3 mức thời gian (120/250/500ms).

BƯỚC 2 – Hệ thống thành phần (làm trước, dùng lại cho mọi màn):
- Nút: một cỡ chiều cao chuẩn (ví dụ 48px) và 1 cỡ lớn cho hành động chính.
  Nút chính vs phụ CHỈ khác màu nền/hiệu ứng, KHÔNG khác kích thước.
  Nút cùng hàng phải cùng chiều cao và chiều rộng (dùng grid/flex:1, không để
  chiều rộng phụ thuộc chữ). Không dùng margin riêng lẻ cho từng nút.
- Trạng thái: hover (nhấc lên), active (lún xuống), disabled, focus rõ ràng.
- Thẻ, ô nhập, chip, thanh tiến độ, modal, toast: cùng token viền/bóng/bo góc.
- Icon: SVG cùng độ dày nét. Không dùng emoji.

BƯỚC 3 – Chuyển động có chủ đích:
- Vào cảnh: trượt/phóng nhẹ + easing "nảy". Phản hồi thao tác: ≤150ms.
- Mọi thao tác chính có phản hồi: bấm, thành công, lỗi, hoàn thành.
- Hỗ trợ prefers-reduced-motion.

BƯỚC 4 – Chất lượng:
- Responsive mobile-first (≥320px), vùng bấm ≥44px.
- Tương phản chữ/nền đạt WCAG AA; không dùng màu làm tín hiệu duy nhất.
- Mọi URL tương đối. Không lib ngoài nếu không cần.

BƯỚC 5 – Tự kiểm tra trước khi giao (trả lời từng mục):
□ Các nút cùng hàng có cùng cao/rộng và thẳng hàng không?
□ Có giá trị khoảng cách/cỡ chữ/bóng nào ngoài thang token không?
□ Bóng và viền có "nặng" quá không (viền + bóng không quá 3px + 4px)?
□ Mọi màn dùng chung một bộ thành phần chứ không viết lại?
□ Chụp ảnh các màn chính ở 375px và 1280px để rà lại.
```

### ===== KẾT THÚC PROMPT GIAO DIỆN =====

**Cách tinh chỉnh khi dùng cho thứ khác**
- Đổi "loại sản phẩm" và "phong cách". Cùng khung này có thể đổi thành "tối giản kiểu Apple", "glassmorphism", "retro pixel"… mà bước 2 đến 5 vẫn đúng.
- Muốn nhẹ hơn thì chỉnh số trong token bóng và viền (ví dụ viền 2px, bóng 2px, độ đặc 85%), không cần viết lại prompt.
- Đính kèm 1 ảnh tham khảo, hoặc nêu tên 2–3 sản phẩm bạn thích, thì AI chọn token sát hơn nhiều so với chỉ mô tả bằng lời.
