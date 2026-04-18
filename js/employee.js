// ===== SEARCH =====
const searchInput = document.querySelector("input[placeholder='Tìm kiếm nhân viên...']");
const rows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    document.querySelectorAll("tbody tr").forEach(row => {
      const name = row.children[2].innerText.toLowerCase();
      const username = row.children[1].innerText.toLowerCase();

      row.style.display =
        name.includes(keyword) || username.includes(keyword)
          ? ""
          : "none";
    });
  });
}
// xóa nhân viên

document.querySelectorAll(".material-symbols-outlined").forEach(icon => {
  if (icon.innerText === "delete") {
    icon.closest("button").onclick = function () {
      const row = this.closest("tr");

      if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {
        row.remove();
      }
    };
  }
});
// khóa/ mở khóa.
document.querySelectorAll(".material-symbols-outlined").forEach(icon => {

  // KHÓA
  if (icon.innerText === "lock") {
    icon.closest("button").onclick = function () {
      const row = this.closest("tr");
      const status = row.children[4].querySelector("span");

      status.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20";
      status.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>Khóa`;

      icon.innerText = "lock_open";
    };
  }

  // MỞ KHÓA
  if (icon.innerText === "lock_open") {
    icon.closest("button").onclick = function () {
      const row = this.closest("tr");
      const status = row.children[4].querySelector("span");

      status.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      status.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Hoạt động`;

      icon.innerText = "lock";
    };
  }

});

//  filter theo vai trò
let currentRole = "all";

document.querySelectorAll("[data-role]").forEach(btn => {
  btn.onclick = function () {
    currentRole = this.dataset.role;

    document.querySelectorAll("tbody tr").forEach(row => {
      const role = row.children[3].innerText;

      if (currentRole === "all" || role.includes(currentRole)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };
});
// edit nhan vien
// ===== EDIT =====
document.querySelectorAll(".material-symbols-outlined").forEach(icon => {
  if (icon.innerText === "edit") {

    icon.closest("button").onclick = function () {
      const row = this.closest("tr");

      const usernameCell = row.children[1];
      const nameCell = row.children[2];

      const oldUsername = usernameCell.innerText;
      const oldName = nameCell.innerText;

      // chuyển thành input
      usernameCell.innerHTML = `<input type="text" value="${oldUsername}" class="border px-2 py-1 rounded w-full">`;
      nameCell.innerHTML = `<input type="text" value="${oldName}" class="border px-2 py-1 rounded w-full">`;

      // đổi nút edit thành save
      const iconSpan = this.querySelector("span");
      iconSpan.innerText = "save";

      this.onclick = function () {
        const newUsername = usernameCell.querySelector("input").value;
        const newName = nameCell.querySelector("input").value;

        // trả lại text
        usernameCell.innerText = newUsername;
        nameCell.innerText = newName;

        iconSpan.innerText = "edit";

        // gắn lại edit
        location.reload(); // đơn giản nhất
      };
    };

  }
});

// hiển thị theo vai trò mặc định
const employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];
const tbody = document.querySelector("tbody");

employeeList.forEach(emp => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="px-6 py-5 font-mono text-sm text-primary">${emp.code}</td>
    <td class="px-6 py-5 font-medium">${emp.username}</td>
    <td class="px-6 py-5">${emp.name}</td>
    <td class="px-6 py-5">
      <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
        ${emp.role}
      </span>
    </td>
    <td class="px-6 py-5 text-center">
      <span class="text-sm">${emp.status}</span>
    </td>
    <td class="px-6 py-5 text-right">
      <span class="material-symbols-outlined cursor-pointer">edit</span>
      <span class="material-symbols-outlined cursor-pointer">delete</span>
    </td>
  `;

  tbody.appendChild(tr);
});
// Xóa nhân viên
document.querySelector("tbody").onclick = function (e) {
  const deleteBtn = e.target.closest(".material-symbols-outlined");

  if (!deleteBtn) return;

  if (deleteBtn.innerText === "delete") {
    const row = deleteBtn.closest("tr");
    const username = row.children[1].innerText;

    if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {

      let list = JSON.parse(localStorage.getItem("employeeList")) || [];

      list = list.filter(emp => emp.username !== username);

      localStorage.setItem("employeeList", JSON.stringify(list));

      row.remove();
    }
  }

// edit nhân viên
  const editBtn = e.target.closest(".material-symbols-outlined");

  if (!editBtn) return;

  if (editBtn.innerText === "edit") {
    const row = editBtn.closest("tr");

    const usernameCell = row.children[1];
    const nameCell = row.children[2];

    const oldUsername = usernameCell.innerText;
    const oldName = nameCell.innerText;

    // chuyển sang input
    usernameCell.innerHTML = `<input value="${oldUsername}" class="border px-2 py-1 rounded w-full text-black dark:text-white bg-white dark:bg-[#3d2d1e]"">`;
    nameCell.innerHTML = `<input value="${oldName}" class="border px-2 py-1 rounded w-full text-black dark:text-white bg-white dark:bg-[#3d2d1e]"">`;

    editBtn.innerText = "save";

  } else if (editBtn.innerText === "save") {

    const row = editBtn.closest("tr");

    const usernameInput = row.children[1].querySelector("input");
    const nameInput = row.children[2].querySelector("input");

    const newUsername = usernameInput.value;
    const newName = nameInput.value;

    const oldUsername = row.children[1].innerText;

    // update localStorage
    let list = JSON.parse(localStorage.getItem("employeeList")) || [];

    list = list.map(emp => {
      if (emp.username === oldUsername) {
        return {
          ...emp,
          username: newUsername,
          name: newName
        };
      }
      return emp;
    });

    localStorage.setItem("employeeList", JSON.stringify(list));

    // update UI
    row.children[1].innerText = newUsername;
    row.children[2].innerText = newName;

    editBtn.innerText = "edit";
  }
};