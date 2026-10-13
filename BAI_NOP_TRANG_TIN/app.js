const dialog = document.querySelector('dialog');
const articles = {
  'song-hong': ["'Ưu tiên tái định cư trước khi triển khai Trục cảnh quan sông Hồng'", 'Hà Nội sẽ ưu tiên xây dựng các khu tái định cư trước khi triển khai Trục Đại lộ cảnh quan sông Hồng - dự án hơn 11.400 ha, liên quan khoảng 247.000 dân ven sông, thực hiện giai đoạn 2026-2038.'],
  'giai-phong': ['Hà Nội giải phóng mặt bằng cho hơn 1.400 dự án', 'Nội dung bài viết chi tiết chưa được cung cấp trong ảnh mẫu.'],
  'ebola': ['TP HCM siết kiểm soát người nhập cảnh phòng Ebola', 'Nội dung bài viết chi tiết chưa được cung cấp trong ảnh mẫu.'],
  'youtube': ["'Bóc lột' trên YouTube", 'Khi cỗ máy Content ID của YouTube bị trục lợi, nhiều nghệ sĩ trở thành nạn nhân.', 'Hoàng Hà · 24 bình luận trong ảnh mẫu.']
};
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const key = link.getAttribute('href').slice(1);
  if (articles[key]) {
    event.preventDefault();
    document.querySelector('#article-title').textContent = articles[key][0];
    const paragraphs = articles[key].slice(1).map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    });
    document.querySelector('#article-body').replaceChildren(...paragraphs);
    dialog.showModal();
  } else if (link.closest('.navigation') && key) {
    document.querySelectorAll('.navigation a').forEach(item => {
      item.classList.toggle('selected', item === link);
    });
  }
});
document.querySelectorAll('.close,.back').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;

  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right
    || event.clientY < rect.top || event.clientY > rect.bottom;

  if (outside) dialog.close();
});
