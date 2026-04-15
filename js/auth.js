// ================= DATA =================
const data = [
  { date: "2023-10-30", orders: 24, revenue: 6800000 },
  { date: "2023-10-29", orders: 18, revenue: 4200000 },
  { date: "2023-10-28", orders: 31, revenue: 9150000 },
  { date: "2023-10-27", orders: 22, revenue: 5400000 },
  { date: "2023-10-26", orders: 27, revenue: 7900000 },
  { date: "2023-10-25", orders: 20, revenue: 5000000 },
  { date: "2023-10-24", orders: 15, revenue: 3000000 },
  { date: "2023-10-23", orders: 35, revenue: 10000000 },
];

// ================= BIẾN =================
let filteredData = [...data];
let currentPage = 1;
const rowsPerPage = 5;

// ================= FORMAT =================
function formatMoney(num) {
  return num.toLocaleString("vi-VN") + "đ";
}

// ================= RENDER TABLE =================
function renderTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageData = filteredData.slice(start, end);

  pageData.forEach(item => {
    let avg = Math.round(item.revenue / item.orders);

    let status = "Ổn định";
    let statusClass = "bg-slate-500/10 text-slate-400";

    if (avg > 280000) {
      status = "Tăng trưởng";
      statusClass = "bg-emerald-500/10 text-emerald-500";
    } else if (avg < 240000) {
      status = "Sụt giảm";
      statusClass = "bg-rose-500/10 text-rose-500";
    }

    tableBody.innerHTML += `
      <tr class="hover:bg-primary/5 transition-colors">
        <td class="px-6 py-4 font-medium">${item.date}</td>
        <td class="px-6 py-4">${item.orders}</td>
        <td class="px-6 py-4">${formatMoney(item.revenue)}</td>
        <td class="px-6 py-4">${formatMoney(avg)}</td>
        <td class="px-6 py-4 text-right">
          <span class="${statusClass} px-3 py-1 rounded-full text-xs font-bold">${status}</span>
        </td>
      </tr>
    `;
  });

  updateSummary();
}

// ================= SUMMARY =================
function updateSummary() {
  let totalRevenue = filteredData.reduce((sum, i) => sum + i.revenue, 0);
  let totalOrders = filteredData.reduce((sum, i) => sum + i.orders, 0);
  let avg = Math.round(totalRevenue / totalOrders || 0);

  document.getElementById("totalRevenue").innerText = formatMoney(totalRevenue);
  document.getElementById("totalOrders").innerText = totalOrders;
  document.getElementById("avgValue").innerText = formatMoney(avg);
}

// ================= FILTER =================
function filterData(type) {
  let today = new Date();

  filteredData = data.filter(item => {
    let d = new Date(item.date);

    if (type === "today") {
      return d.toDateString() === today.toDateString();
    }

    if (type === "week") {
      let diff = (today - d) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }

    if (type === "month") {
      return d.getMonth() === today.getMonth();
    }

    return true;
  });

  currentPage = 1;
  renderTable();
}

// ================= SEARCH =================
document.getElementById("searchInput").addEventListener("input", function () {
  let keyword = this.value.toLowerCase();

  filteredData = data.filter(item =>
    item.date.toLowerCase().includes(keyword)
  );

  currentPage = 1;
  renderTable();
});

// ================= PAGINATION =================
function totalPages() {
  return Math.ceil(filteredData.length / rowsPerPage);
}

function goToPage(page) {
  if (page < 1 || page > totalPages()) return;
  currentPage = page;
  renderTable();
}

document.querySelectorAll(".pagination-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const page = this.getAttribute("data-page");

    if (page === "prev") {
      goToPage(currentPage - 1);
    } else if (page === "next") {
      goToPage(currentPage + 1);
    } else {
      goToPage(parseInt(page));
    }
  });
});

// ================= BUTTON ACTIVE =================
const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => {
      b.classList.remove("bg-primary", "text-black", "font-bold");
      b.classList.add("hover:bg-primary/10");
    });

    btn.classList.add("bg-primary", "text-black", "font-bold");
    btn.classList.remove("hover:bg-primary/10");
  });
});

// ================= CLICK FILTER =================
document.getElementById("todayBtn").onclick = () => filterData("today");
document.getElementById("weekBtn").onclick = () => filterData("week");
document.getElementById("monthBtn").onclick = () => filterData("month");

// ================= INIT =================
renderTable();

const pageButtons = document.querySelectorAll(".pagination-btn");

pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // bỏ active tất cả
    pageButtons.forEach(b => {
      b.classList.remove("bg-primary", "text-black", "font-bold");
      b.classList.add("border", "border-primary/20");
    });

    // thêm active
    if (!btn.dataset.page.includes("prev") && !btn.dataset.page.includes("next")) {
      btn.classList.add("bg-primary", "text-black", "font-bold");
      btn.classList.remove("border");
    }
  });
});