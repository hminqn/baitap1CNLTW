# Bài tập: Dựng giao diện trang tin từ ảnh mẫu

Họ và tên: ..................................................

Lớp: ...........................................................

Mục tiêu: Tái tạo giao diện trong ảnh tham khảo bằng HTML, CSS và JavaScript. Đây là bản demo giao diện tĩnh; nội dung và thời gian đăng là dữ liệu minh họa từ ảnh mẫu.

## 1. Mở demo

1. Giải nén toàn bộ file ZIP vào một thư mục.
2. Mở `index.html` bằng Chrome hoặc Edge. Không cần cài Node.js, không cần Internet.
3. Xem thanh chuyên mục, tin nổi bật, hai tin nhỏ và khối Góc nhìn.
4. Bấm tiêu đề hoặc ảnh của bài viết để mở hộp thoại. Đóng bằng nút ×, nút quay lại, phím Esc hoặc bấm ngoài hộp thoại.
5. Thu nhỏ cửa sổ trình duyệt để xem cách bố cục đổi theo chiều rộng màn hình.

Giữ nguyên vị trí các file. Nếu chỉ gửi `index.html`, trang sẽ thiếu định dạng, ảnh và tương tác.

## 2. Cấu trúc bài nộp

```text
BAI_NOP_TRANG_TIN/
├── index.html          Nội dung và cấu trúc trang
├── style.css           Màu sắc, kiểu chữ, bố cục, responsive
├── app.js              Tương tác mở và đóng bài viết
├── assets/
│   └── reference.png   Ảnh mẫu được dùng để hiển thị các vùng hình ảnh
├── HUONG_DAN.md         Hướng dẫn đọc mã nguồn
└── HUONG_DAN.html       Hướng dẫn dễ đọc trong trình duyệt
```

## 3. Giải thích từng file

### index.html — khung và nội dung

- `<!doctype html>`: khai báo tài liệu HTML5.
- `<html lang="vi">`: cho biết ngôn ngữ của trang là tiếng Việt.
- `<meta charset="UTF-8">`: hiển thị đúng dấu tiếng Việt.
- Thẻ `viewport`: giúp trang dùng đúng chiều rộng màn hình trên điện thoại.
- `<link rel="stylesheet" href="style.css">`: nạp định dạng CSS.
- `<nav class="navigation">`: thanh chuyên mục ở đầu trang. Biểu tượng ngôi nhà được vẽ bằng SVG ngay trong HTML.
- `<main>`: vùng nội dung chính.
- `<section class="lead">`: tin nổi bật gồm ảnh và phần chữ.
- `<article>`: một bài viết; `h1` là tiêu đề chính, `h2` là tiêu đề các tin nhỏ.
- `<section class="secondary">`: hai tin nhỏ và khối Góc nhìn.
- `<aside class="opinion">`: nội dung Góc nhìn, tên tác giả và số bình luận minh họa.
- `<dialog>`: hộp thoại bài viết, mặc định chưa mở.
- `<script src="app.js">`: nạp JavaScript ở cuối trang, sau khi các phần tử HTML đã xuất hiện.

Muốn sửa tiêu đề hay mô tả trên trang chủ, sửa chữ trong file này. Nếu bài đó có hộp thoại, sửa cả dữ liệu tương ứng trong `app.js`.

### style.css — định dạng và bố cục

- `box-sizing: border-box`: kích thước phần tử tính cả phần đệm và viền.
- `.navigation`: dùng Flexbox để xếp chuyên mục theo hàng ngang; cho phép cuộn ngang nếu thiếu chỗ.
- `.lead`: dùng CSS Grid với hai cột `1.04fr 1fr`. Cột ảnh hơi rộng hơn cột chữ; `gap` tạo khoảng cách giữa chúng.
- `.secondary`: dùng Grid với ba cột `1.26fr 1.26fr 1fr`; hai cột tin rộng hơn cột Góc nhìn.
- `font`, `color`, `margin`, `padding`: điều chỉnh kiểu chữ, màu sắc và khoảng cách.
- `.photo`: khung ảnh có `position: relative` và `overflow: hidden`.
- `.photo img`: đặt ảnh mẫu bằng `position: absolute`. `width`, `left`, `top` phóng và dịch ảnh để chỉ lộ vùng hình cần dùng.
- `.photo-river`, `.photo-construction`, `.photo-airport`: ba cách hiển thị ba vùng ảnh khác nhau của cùng một file.
- `aspect-ratio`: giữ tỷ lệ khung ảnh khi màn hình thay đổi.
- `.opinion`: nền xám nhạt; `.category`: màu đỏ tím cho nhãn Góc nhìn.
- `dialog::backdrop`: nền tối phía sau hộp thoại.
- `:hover`, `:focus-visible`: phản hồi khi rê chuột hoặc dùng bàn phím.
- `@media (max-width: 1000px)`: hàng dưới chuyển còn hai cột, Góc nhìn xuống hàng.
- `@media (max-width: 600px)`: trang chuyển thành một cột để đọc trên điện thoại.
- `@media (min-width: 1500px)`: điều chỉnh cho màn hình lớn.

Muốn đổi màu nhấn, tìm `#9f224e`. Muốn đổi kích thước chữ tiêu đề chính, tìm `.lead-copy h1`. Muốn đổi khoảng cách giữa các cột, sửa `gap` trong `.lead` và `.secondary`.

### app.js — tương tác

1. `document.querySelector('dialog')` tìm hộp thoại trong HTML.
2. Đối tượng `articles` chứa các bài minh họa. Ví dụ, khóa `song-hong` tương ứng liên kết `href="#song-hong"`.
3. `document.addEventListener('click', ...)` lắng nghe thao tác bấm trên trang.
4. `event.target.closest('a')` tìm liên kết được bấm, kể cả khi người dùng bấm vào ảnh nằm trong liên kết.
5. `.slice(1)` bỏ dấu `#` để tìm khóa bài viết.
6. Nếu có bài tương ứng, `event.preventDefault()` ngăn hành vi nhảy đến liên kết.
7. `textContent`, `createElement` và `replaceChildren` đưa tiêu đề, các đoạn văn vào hộp thoại.
8. `dialog.showModal()` mở hộp thoại.
9. Với liên kết chuyên mục, JavaScript đổi lớp `.selected` để tô màu mục vừa chọn.
10. `dialog.close()` đóng hộp thoại khi bấm nút hoặc vùng ngoài.

Menu chuyên mục chỉ đổi màu mục được chọn; mục Góc nhìn còn cuộn đến khối có `id="goc-nhin"`. Bản demo chưa có các trang chuyên mục hoặc tính năng lọc tin.

### assets/reference.png — tài nguyên hình ảnh

Đây là ảnh chụp mẫu đã cung cấp. Ba vùng ảnh được hiển thị bằng CSS từ cùng một file. Phần chữ và bố cục trang vẫn được dựng bằng HTML/CSS, không phải hiển thị nguyên ảnh chụp làm trang web.

Nếu thay bằng ba ảnh độc lập, cần sửa đường dẫn `src` trong HTML và bỏ các quy tắc phóng/dịch ảnh của `.photo-... img`. Có thể chuyển sang `width: 100%`, `height: 100%`, `object-fit: cover`, `inset: 0` cho ảnh.

## 4. Cách trình bày với thầy giáo

“Bài của em là giao diện trang tin được dựng theo ảnh tham khảo. HTML khai báo nội dung và các khu vực của trang. CSS dùng Flexbox cho thanh chuyên mục, Grid cho các cột bài viết và media query để thay đổi bố cục trên màn hình nhỏ. JavaScript xử lý mở, đóng hộp thoại khi bấm bài viết. Ảnh minh họa được lấy từ các vùng của ảnh mẫu bằng CSS. Bài hiện là demo tĩnh, chưa kết nối cơ sở dữ liệu hoặc hệ thống tin tức.”

Khi trình bày, mở trang chủ, bấm một bài viết, đóng hộp thoại, rồi thu nhỏ cửa sổ để minh họa responsive. Sau đó mở lần lượt `index.html`, `style.css`, `app.js` để giải thích theo thứ tự nội dung → giao diện → tương tác.

## 5. Phạm vi và kiểm tra

- Bài nộp không có backend, đăng nhập, quản trị hoặc cơ sở dữ liệu.
- Các tin chưa có nội dung chi tiết sẽ hiện thông báo dữ liệu chưa được cung cấp.
- Số 24 bình luận và “1h trước” là chữ minh họa, không được cập nhật tự động.
- Không cần gửi thư mục `.git`, `.openai`, máy chủ cục bộ hoặc công cụ triển khai.
- Đã kiểm tra cú pháp JavaScript và các đường dẫn tài nguyên trong bộ bài nộp. Chưa kiểm tra trực quan bằng trình duyệt vì quyền mở bản xem trước bị từ chối trong phiên trước.

Trước khi gửi, điền họ tên/lớp, đọc hiểu mã nguồn và tự mở demo theo các bước ở mục 1.
