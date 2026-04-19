
function showTab(tab) {

    // Ẩn tất cả
    document.querySelectorAll(".tab-content").forEach(el => {
        el.classList.add("hidden");
    });

    // Hiện tab được chọn
    document.getElementById(tab).classList.remove("hidden");

    // Reset màu tab
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("text-primary", "border-primary");
        btn.classList.add("text-slate-400");
    });

    // Active tab
    document.getElementById("tab-" + tab).classList.add("text-primary", "border-primary");
}
const orderBtn = document.querySelector("button");

orderBtn.addEventListener("click", () => {
    const order = [
        { name: "Phở Bò Tái Lăn", qty: 1, note: "Ít hành" },
        { name: "Gỏi Cuốn Tôm Thịt", qty: 2, note: "" },
        { name: "Cà Phê Sữa Đá", qty: 1, note: "" }
    ];

    localStorage.setItem("kitchenOrders", JSON.stringify(order));

    window.location.href = "kitchenV3.html";
});

const orders = JSON.parse(localStorage.getItem("kitchenOrders")) || [];
const container = document.getElementById("order-list");

orders.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "bg-background-dark border-l-4 border-primary rounded-lg p-4 shadow-lg";

    div.innerHTML = `
        <div class="flex justify-between mb-2">
            <span class="text-xs text-primary">Chờ</span>
            <span class="text-sm text-slate-400">BÀN 01</span>
        </div>

        <h4 class="text-lg font-bold text-slate-100">${item.name}</h4>
        <p class="text-primary font-bold text-xl my-1">x${item.qty}</p>
        <p class="text-slate-400 text-sm italic mb-4">${item.note || ""}</p>

        <button onclick="startCooking(${index})"
            class="w-full bg-primary text-background-dark py-2 rounded-lg">
            BẮT ĐẦU NẤU
        </button>
    `;

    container.appendChild(div);
});

function startCooking(i) {
    alert("Đang nấu: " + orders[i].name);
}
