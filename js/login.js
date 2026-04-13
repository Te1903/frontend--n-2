// 🔥 DANH SÁCH USER
const users = {
  admin: {
    pass: "123",
    role: "admin",
    page: "./Pages/Dashboard_Overview.html"
  },
  thungan: {
    pass: "123",
    role: "cashier",
    page: "Cashier/cashier.html"
  },
  bep: {
    pass: "123",
    role: "kitchen",
    page: "Kitchen/kitchenv3.html"
  }
};

// 🔥 ROLE HIỆN TẠI (tab đang chọn)
let currentRole = "admin";

// 🔥 CHUYỂN TAB ADMIN / STAFF
function switchRole(role) {
  const adminTab = document.getElementById('admin-tab');
  const staffTab = document.getElementById('staff-tab');
  const title = document.getElementById('login-title');

  currentRole = role;

  if (role === 'admin') {
    adminTab.classList.add('active');
    staffTab.classList.remove('active');
    title.innerText = 'Đăng nhập Quản trị viên';
  } else {
    staffTab.classList.add('active');
    adminTab.classList.remove('active');
    title.innerText = 'Đăng nhập Nhân viên';
  }
}

// 🔥 LOGIN
function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  // ❌ Không tồn tại user
  if (!users[user]) {
    showError();
    return;
  }

  // ❌ Sai mật khẩu
  if (users[user].pass !== pass) {
    showError();
    return;
  }

  // ❌ Sai role (admin mà login vào staff hoặc ngược lại)
  if (currentRole === "admin" && users[user].role !== "admin") {
    alert("Bạn phải đăng nhập bằng tài khoản ADMIN!");
    return;
  }

  if (currentRole === "staff" && users[user].role === "admin") {
    alert("Admin không đăng nhập ở mục Nhân viên!");
    return;
  }

  // ✅ OK → lưu
  localStorage.setItem("role", users[user].role);
  localStorage.setItem("username", user);

  // 👉 chuyển trang
  window.location.href = users[user].page;
}

// 🔥 POPUP LỖI
function showError() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// 🔥 SHOW/HIDE PASSWORD
function togglePassword() {
  const input = document.getElementById('password');
  const icon = document.getElementById('password-icon');

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// 🔥 SUBMIT FORM
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  login();
});