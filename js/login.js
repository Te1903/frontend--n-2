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

// =====================
// 🔥 ROLE HIỆN TẠI
// =====================
let currentRole = "admin";

// =====================
// 🔥 CHUYỂN TAB
// =====================
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

// =====================
// 🔥 LOGIN (CHUẨN)
// =====================
function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  // ❌ Không tồn tại user
  if (!users[user]) {
    showError();
    return;
  }

  // 🔥 Ưu tiên password mới (nếu đã reset)
  const savedPass = localStorage.getItem("user_" + user);
  const correctPass = savedPass ? savedPass : users[user].pass;

  // ❌ Sai mật khẩu
  if (pass !== correctPass) {
    showError();
    return;
  }

  // ❌ Sai role
  if (currentRole === "admin" && users[user].role !== "admin") {
    alert("Bạn phải đăng nhập bằng tài khoản ADMIN!");
    return;
  }

  if (currentRole === "staff" && users[user].role === "admin") {
    alert("Admin không đăng nhập ở mục Nhân viên!");
    return;
  }

  // ✅ OK
  localStorage.setItem("role", users[user].role);
  localStorage.setItem("username", user);

  window.location.href = users[user].page;
}

// =====================
// 🔥 SUBMIT FORM
// =====================
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  login();
});

// =====================
// 🔥 POPUP LỖI
// =====================
function showError() {
  alert("Sai tài khoản hoặc mật khẩu!");
}

// =====================
// 🔥 SHOW/HIDE PASSWORD
// =====================
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

// =====================
// 🔥 NÚT TRANG CHỦ
// =====================
function goHome() {
  window.location.href = "../index.html";
}

// =====================
// 🔥 HIỆN FORM QUÊN MẬT KHẨU
// =====================
function showForgot() {
  document.getElementById("forgot-box").classList.toggle("hidden");
}

// =====================
// 🔥 RESET PASSWORD
// =====================
function resetPassword() {
  const user = document.getElementById("reset-user").value.trim();
  const newPass = document.getElementById("new-pass").value.trim();

  // ❌ user không tồn tại
  if (!users[user]) {
    alert("Tài khoản không tồn tại!");
    return;
  }

  // ❌ chưa nhập
  if (!newPass) {
    alert("Vui lòng nhập mật khẩu mới!");
    return;
  }

  // ✅ lưu pass mới
  localStorage.setItem("user_" + user, newPass);

  alert("Cập nhật mật khẩu thành công!");
}