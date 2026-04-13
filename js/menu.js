document.addEventListener("DOMContentLoaded", () => {

    // ===== FILTER =====
    const buttons = document.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll("[data-category]");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            items.forEach(item => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });

            // active button
            buttons.forEach(b => b.classList.remove("bg-primary","text-black"));
            btn.classList.add("bg-primary","text-black");
        });
    });

    // ===== LOAD MORE =====
    const loadBtn = document.querySelector("button.mt-16 button, .mt-16 button");
    let visible = 3;

    const showItems = () => {
        items.forEach((item, index) => {
            item.style.display = index < visible ? "flex" : "none";
        });
    };

    showItems();

    loadBtn.addEventListener("click", () => {
        visible += 3;
        showItems();

        if (visible >= items.length) {
            loadBtn.innerText = "Đã hiển thị tất cả";
            loadBtn.disabled = true;
        }
    });

    // ===== DARK MODE TOGGLE =====
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "🌙";
    toggleBtn.className = "px-3 py-2 border rounded";

    document.querySelector("header .flex.items-center.gap-4").appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });

    // ===== ĐẶT BÀN =====
    const bookingBtn = document.querySelector("a[href='#']");
    bookingBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Đặt bàn thành công! Chúng tôi sẽ liên hệ bạn.");
    });

});
