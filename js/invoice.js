const searchInput = document.querySelector("input[placeholder='Search ID...']");
const rows = document.querySelectorAll("tbody tr");

searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  rows.forEach(row => {
    const invoiceId = row.children[0].innerText.toLowerCase();

    if (invoiceId.includes(keyword)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
// xem chi tiết
document.querySelectorAll(".btn-detail").forEach(btn => {
  btn.addEventListener("click", function () {
    const id = this.closest("tr").children[0].innerText;
    alert("Chi tiết hóa đơn: " + id);
  });
});
// thanh toán 
document.querySelectorAll(".btn-payment").forEach(btn => {
  btn.addEventListener("click", function () {
    const row = this.closest("tr");
    const status = row.querySelector("span");

    status.innerText = "Đã thanh toán";
    status.className =
      "px-2.5 py-1 text-[11px] font-bold uppercase rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";

    this.remove();
  });
});
// cơ bản
const rowsPerPage = 3;
let currentPage = 1;

function showPage(page) {
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row, index) => {
    if (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

showPage(1);

// csv export
// ===== EXPORT CSV =====
const exportBtn = document.querySelector("button");

if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    let csv = [];

    // header
    const headers = ["Ma hoa don", "Ban", "Thoi gian", "Tong tien", "Trang thai"];
    csv.push(headers.join(","));

    // data
    document.querySelectorAll("tbody tr").forEach(row => {
      const cols = row.querySelectorAll("td");

      const rowData = [
        cols[0].innerText,
        cols[1].innerText,
        cols[2].innerText,
        cols[3].innerText,
        cols[4].innerText
      ];

      csv.push(rowData.join(","));
    });

    // tạo file
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "hoa_don.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  });
}