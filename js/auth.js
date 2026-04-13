
const data = [
  { date: "2023-10-30", orders: 24, revenue: 6800000 },
  { date: "2023-10-29", orders: 18, revenue: 4200000 },
  { date: "2023-10-28", orders: 31, revenue: 9150000 },
  { date: "2023-10-27", orders: 22, revenue: 5400000 },
  { date: "2023-10-26", orders: 27, revenue: 7900000 }
];

function filterData(type) {
  let today = new Date();

  let result = data.filter(item => {
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

  renderTable(result);
}

// click
todayBtn.onclick = () => filterData("today");
weekBtn.onclick = () => filterData("week");
monthBtn.onclick = () => filterData("month");



function formatMoney(num) {
  return num.toLocaleString("vi-VN") + "đ";
}

function renderTable(list) {
  let html = "";

  list.forEach(item => {
    let avg = Math.round(item.revenue / item.orders);

    html += `
      <tr class="hover:bg-primary/5">
        <td class="px-6 py-4">${item.date}</td>
        <td class="px-6 py-4">${item.orders}</td>
        <td class="px-6 py-4">${formatMoney(item.revenue)}</td>
        <td class="px-6 py-4">${formatMoney(avg)}</td>
        <td class="px-6 py-4 text-right">
          <span class="text-emerald-500 font-bold">OK</span>
        </td>
      </tr>
    `;
  });

  document.getElementById("table-body").innerHTML = html;
}

// load lần đầu
renderTable(data);

// thanh tìm kiếm

document.getElementById("searchInput").addEventListener("input", function () {
  let keyword = this.value.toLowerCase();

  let filtered = data.filter(item =>
    item.date.includes(keyword)
  );

  renderTable(filtered);
});
// thống kê doanh thu

function updateSummary(list) {
  let totalRevenue = list.reduce((sum, i) => sum + i.revenue, 0);
  let totalOrders = list.reduce((sum, i) => sum + i.orders, 0);
  let avg = totalRevenue / totalOrders;

  document.getElementById("totalRevenue").innerText = formatMoney(totalRevenue);
  document.getElementById("totalOrders").innerText = totalOrders;
  document.getElementById("avgValue").innerText = formatMoney(avg);
}

// gọi lại khi filter
function renderTable(list) {
  let html = "";

  list.forEach(item => {
    let avg = Math.round(item.revenue / item.orders);

    html += `
      <tr>
        <td class="px-6 py-4">${item.date}</td>
        <td class="px-6 py-4">${item.orders}</td>
        <td class="px-6 py-4">${formatMoney(item.revenue)}</td>
        <td class="px-6 py-4">${formatMoney(avg)}</td>
        <td class="px-6 py-4 text-right">OK</td>
      </tr>
    `;
  });

  document.getElementById("table-body").innerHTML = html;
  updateSummary(list);
}

// nút cam

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    // ❌ Xóa active tất cả
    buttons.forEach(b => {
      b.classList.remove("bg-primary", "text-black", "font-bold");
      b.classList.add("hover:bg-primary/10");
    });

    // ✅ Thêm active cho button đang click
    btn.classList.add("bg-primary", "text-black", "font-bold");
    btn.classList.remove("hover:bg-primary/10");
  });
});
