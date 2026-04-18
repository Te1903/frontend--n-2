const rowsPerPage = 5;
let currentPage = 1;

// 👉 DATA GIẢ (sau này bạn có thể thay bằng API hoặc DB)
const data = [
  {date:"30/10/2023", orders:24, revenue:6800000, avg:283333, status:"up"},
  {date:"29/10/2023", orders:18, revenue:4200000, avg:233333, status:"down"},
  {date:"28/10/2023", orders:31, revenue:9150000, avg:295161, status:"up"},
  {date:"27/10/2023", orders:22, revenue:5400000, avg:245454, status:"normal"},
  {date:"26/10/2023", orders:27, revenue:7900000, avg:292592, status:"up"},
  {date:"25/10/2023", orders:20, revenue:5000000, avg:250000, status:"normal"},
  {date:"24/10/2023", orders:15, revenue:3000000, avg:200000, status:"down"},
  {date:"23/10/2023", orders:35, revenue:10000000, avg:285000, status:"up"},
];

// 👉 FORMAT TIỀN
function formatMoney(num){
  return num.toLocaleString("vi-VN") + "đ";
}

// 👉 RENDER TABLE
function renderTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageData = data.slice(start, end);

  pageData.forEach(item => {
    let statusHTML = "";
    if(item.status === "up"){
      statusHTML = `<span class="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold">Tăng trưởng</span>`;
    } else if(item.status === "down"){
      statusHTML = `<span class="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-xs font-bold">Sụt giảm</span>`;
    } else {
      statusHTML = `<span class="bg-slate-500/10 text-slate-400 px-3 py-1 rounded-full text-xs font-bold">Ổn định</span>`;
    }

    tableBody.innerHTML += `
      <tr class="hover:bg-primary/5 transition-colors">
        <td class="px-6 py-4 font-medium">${item.date}</td>
        <td class="px-6 py-4">${item.orders}</td>
        <td class="px-6 py-4">${formatMoney(item.revenue)}</td>
        <td class="px-6 py-4">${formatMoney(item.avg)}</td>
        <td class="px-6 py-4 text-right">${statusHTML}</td>
      </tr>
    `;
  });
}

// 👉 TỔNG SỐ TRANG
function totalPages(){
  return Math.ceil(data.length / rowsPerPage);
}

// 👉 CHUYỂN TRANG
function goToPage(page){
  if(page < 1 || page > totalPages()) return;
  currentPage = page;
  renderTable();
}

// 👉 BUTTON
document.querySelectorAll(".pagination-btn").forEach(btn=>{
  btn.addEventListener("click", function(){
    const page = this.getAttribute("data-page");
    
    if(page === "prev"){
      goToPage(currentPage - 1);
    } else if(page === "next"){
      goToPage(currentPage + 1);
    } else {
      goToPage(parseInt(page));
    }
  });
});

// 👉 INIT
renderTable();
