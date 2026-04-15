document.addEventListener("DOMContentLoaded", () => {

  const menu = document.getElementById("sidebarMenu");
  const items = document.querySelectorAll(".menu-item");
  const bg = document.getElementById("activeMenuBg");

  if (!menu || !items.length || !bg) return; // tránh lỗi null

  function moveBg(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = menu.getBoundingClientRect();

    bg.style.top = (rect.top - parentRect.top) + "px";
    bg.style.height = rect.height + "px";
    bg.style.left = "0px";
    bg.style.width = "100%";
  }

  // 👉 active theo URL
  const currentPage = window.location.pathname.split("/").pop();

  let activeItem = items[0];

  items.forEach(item => {
    const link = item.getAttribute("href");

    if (link && link.split("/").pop() === currentPage) {
      activeItem = item;
    }

    item.addEventListener("mouseenter", () => moveBg(item));

    item.addEventListener("click", () => {
      activeItem = item;
      moveBg(item);
    });
  });

  // 👉 khi rời chuột → quay về item active
  menu.addEventListener("mouseleave", () => {
    moveBg(activeItem);
  });

  // 👉 chạy lần đầu
  setTimeout(() => {
    moveBg(activeItem);
  }, 50);

});