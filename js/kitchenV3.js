
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
