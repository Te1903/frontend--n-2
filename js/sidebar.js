// ===== SEARCH =====
const searchInput = document.querySelector("input[placeholder='Search ID...']");
const rows = document.querySelectorAll("tbody tr");

if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();

      document.querySelectorAll("tbody tr").forEach(row => {
        const id = row.children[0].innerText.toLowerCase();

        row.style.display = id.includes(keyword) ? "" : "none";
      });
    });
}

// ===== VIEW DETAIL =====
document.querySelectorAll(".btn-detail").forEach(btn => {
  btn.addEventListener("click", function () {
    const id = this.closest("tr").children[0].innerText;
    alert("Chi tiết hóa đơn: " + id);
  });
});

// ===== PAYMENT =====
document.querySelectorAll(".btn-payment").forEach(btn => {
  btn.addEventListener("click", function () {
    const row = this.closest("tr");
    const status = row.querySelector("span");

    status.innerText = "Đã thanh toán";

    this.remove();
  });
});

// ===== PAGINATION =====
const rowsPerPage = 3;
let currentPage = 1;

function showPage(page) {
 const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row, index) => {
    row.style.display =
      index >= (page - 1) * rowsPerPage && index < page * rowsPerPage
        ? ""
        : "none";
  });
}
// đang xuất
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "../Login.html";
      }
    });
  }
});
showPage(1);