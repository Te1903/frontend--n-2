// ===== LẤY ELEMENT =====
const searchMenu = document.querySelector("input[placeholder='Tìm kiếm tên món ăn...']");
const tbody = document.querySelector("tbody");

let currentType = "all";
let menuList = JSON.parse(localStorage.getItem("menuList")) || [];

// ===== RENDER MENU =====
function renderMenu() {

  menuList.forEach(item => {

    // tránh trùng
    const exist = Array.from(document.querySelectorAll("p.font-semibold"))
      .some(p => p.innerText === item.name);

    if (exist) return;

    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td class="px-6 py-4 flex items-center gap-3">
    <img src="${item.image || 'https://via.placeholder.com/50'}" 
        class="w-12 h-12 object-cover rounded-lg border">
    <p class="font-semibold">${item.name}</p>
    </td>
      <td class="px-6 py-4 text-sm">${item.category}</td>
      <td class="px-6 py-4 font-medium text-primary">${item.price}</td>
      <td class="px-6 py-4 text-center">
        <div class="flex justify-center">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" ${item.status === "Đang bán" ? "checked" : ""}>
            <div class="w-11 h-6 bg-stone-300 dark:bg-stone-700 rounded-full 
              peer peer-checked:after:translate-x-full 
              peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-5 after:w-5 after:transition-all 
              peer-checked:bg-primary"></div>
            <span class="ml-3 text-sm font-medium text-stone-600 dark:text-stone-400 min-w-[70px]">
              ${item.status}
            </span>
          </label>
        </div>
      </td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button class="btn-edit" data-id="${item.id}">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn-delete" data-id="${item.id}">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  attachEvents();
  applyFilter();
}

// ===== EVENT =====
function attachEvents() {

  // ===== DELETE =====
  tbody.onclick = function (e) {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (!id) {
      btn.closest("tr").remove();
      return;
    }

    if (confirm("Bạn có chắc muốn xóa?")) {
      menuList = menuList.filter(item => item.id !== id);
      localStorage.setItem("menuList", JSON.stringify(menuList));
      btn.closest("tr").remove();
    }
  };

  // ===== EDIT =====
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.onclick = function () {
      const id = Number(this.dataset.id);
      const item = menuList.find(x => x.id === id);
      if (!item) return;

      localStorage.setItem("editMenu", JSON.stringify(item));
      window.location.href = "editmenu.html";
    };
  });

  // ===== TOGGLE =====
  document.querySelectorAll("input[type='checkbox']").forEach(toggle => {
    toggle.onchange = function () {
      const row = this.closest("tr");
      const label = this.closest("label").querySelector("span");

      const btn = row.querySelector(".btn-edit");
      if (!btn) return;

      const id = Number(btn.dataset.id);
      const item = menuList.find(x => x.id === id);
      if (!item) return;

      if (this.checked) {
        item.status = "Đang bán";
        label.innerText = "Đang bán";
      } else {
        item.status = "Ngừng bán";
        label.innerText = "Ngừng bán";
      }

      localStorage.setItem("menuList", JSON.stringify(menuList));
    };
  });
}

// ===== SEARCH + FILTER =====
function applyFilter() {
  const keyword = searchMenu.value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const name = row.querySelector("p.font-semibold")?.innerText.toLowerCase() || "";
    const category = row.children[1]?.innerText || "";

    const matchName = name.includes(keyword);
    const matchType = currentType === "all" || category === currentType;

    row.style.display = (matchName && matchType) ? "" : "none";
  });
}

// SEARCH
if (searchMenu) {
  searchMenu.addEventListener("input", applyFilter);
}

// FILTER
document.querySelectorAll("[data-type]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentType = btn.dataset.type;
    applyFilter();
  });
});

// ===== INIT =====
renderMenu();