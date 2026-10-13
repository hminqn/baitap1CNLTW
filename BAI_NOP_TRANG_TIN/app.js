// Lấy phần tử hộp thoại đã khai báo trong index.html.
const dialog = document.querySelector('dialog');
// Dữ liệu minh họa: mỗi khóa tương ứng với một href="#..." trong HTML.
// Phần tử đầu là tiêu đề, các phần tử sau là đoạn văn.
const articles = {
  'song-hong': ["'Ưu tiên tái định cư trước khi triển khai Trục cảnh quan sông Hồng'", 'Hà Nội sẽ ưu tiên xây dựng các khu tái định cư trước khi triển khai Trục Đại lộ cảnh quan sông Hồng - dự án hơn 11.400 ha, liên quan khoảng 247.000 dân ven sông, thực hiện giai đoạn 2026-2038.'],
  'giai-phong': ['Hà Nội giải phóng mặt bằng cho hơn 1.400 dự án', 'Nội dung bài viết chi tiết chưa được cung cấp trong ảnh mẫu.'],
  'ebola': ['TP HCM siết kiểm soát người nhập cảnh phòng Ebola', 'Nội dung bài viết chi tiết chưa được cung cấp trong ảnh mẫu.'],
  'youtube': ["'Bóc lột' trên YouTube", 'Khi cỗ máy Content ID của YouTube bị trục lợi, nhiều nghệ sĩ trở thành nạn nhân.', 'Hoàng Hà · 24 bình luận trong ảnh mẫu.']
};
// Lắng nghe thao tác bấm và tìm liên kết gần vị trí được bấm nhất.
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const key = link.getAttribute('href').slice(1);
  if (articles[key]) {
    // Ngăn trình duyệt nhảy đến liên kết khi mở hộp thoại bài viết.
    event.preventDefault();
    document.querySelector('#article-title').textContent = articles[key][0];
    // Tạo một thẻ p cho từng đoạn văn sau tiêu đề.
    const paragraphs = articles[key].slice(1).map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    });
    document.querySelector('#article-body').replaceChildren(...paragraphs);
    // Mở hộp thoại và làm mờ nền phía sau.
    dialog.showModal();
  } else if (link.closest('.navigation') && key) {
    document.querySelectorAll('.navigation a').forEach(item => {
      item.classList.toggle('selected', item === link);
    });
  }
});
// Đóng bằng nút × hoặc nút quay lại. Phím Esc được dialog hỗ trợ sẵn.
document.querySelectorAll('.close,.back').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
// Đóng khi bấm ra ngoài vùng hộp thoại.
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;

  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right
    || event.clientY < rect.top || event.clientY > rect.bottom;

  if (outside) dialog.close();
});
