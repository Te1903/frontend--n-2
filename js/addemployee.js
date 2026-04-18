// ===== LẤY INPUT =====
const inputs = document.querySelectorAll("input");
const nameInput = inputs[0];
const usernameInput = inputs[1];
const passwordInput = inputs[2];
const roleSelect = document.querySelector("select");
const statusToggle = document.querySelector("input[type='checkbox']");
const addBtn = document.getElementById("addEmployeeBtn");

// ===== CLICK THÊM =====
if (addBtn) {
  addBtn.onclick = function () {

    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;

    if (!name || !username || !password || !role) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // convert role
    let roleText =
      role === "manager" ? "Quản lý" :
      role === "cashier" ? "Thu ngân" :
      "Bếp";

    const newEmployee = {
      id: Date.now(),
      code: "NV" + Date.now().toString().slice(-3),
      name: name,
      username: username,
      role: roleText,
      status: statusToggle.checked ? "Hoạt động" : "Khóa"
    };

    let list = JSON.parse(localStorage.getItem("employeeList")) || [];

    // ❗ tránh trùng username
    const exist = list.find(x => x.username === username);
    if (exist) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    list.push(newEmployee);

    localStorage.setItem("employeeList", JSON.stringify(list));

    alert("Thêm nhân viên thành công!");

    window.location.href = "Employee_management.html";
  };
}