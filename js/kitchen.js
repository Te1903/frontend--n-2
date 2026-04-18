document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. TÌM KIẾM
    // =========================
    const searchInput = document.querySelector("input[type='text']");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase();

            const cards = document.querySelectorAll(".bg-background-dark");

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();

                if (text.includes(keyword)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    // =========================
    // 2. GỌI PHỤC VỤ
    // =========================
    document.querySelectorAll("button").forEach(btn => {

        if (btn.innerText.includes("GỌI PHỤC VỤ")) {

            btn.addEventListener("click", function () {

                const card = this.closest(".bg-background-dark");

                const foodName = card.querySelector("h4")?.innerText || "";

                // lấy bàn cho chắc
                const table = Array.from(card.querySelectorAll("span"))
                    .find(s => s.innerText.includes("BÀN"))?.innerText || "";

                alert(`Đã gọi phục vụ cho ${foodName} - ${table}`);

                // đổi trạng thái nút
                this.innerText = "ĐÃ GỌI";
                this.disabled = true;
                this.classList.add("opacity-50");
            });
        }

    });


    // =========================
    // 3. BẮT ĐẦU NẤU
    // =========================
    document.querySelectorAll("button").forEach(btn => {

        if (btn.innerText.includes("BẮT ĐẦU NẤU")) {

            btn.addEventListener("click", function () {

                const card = this.closest(".bg-background-dark");

                const cookingColumn = document.querySelectorAll("section")[1]
                    .querySelector(".space-y-3");

                // đổi màu
                card.classList.remove("border-primary", "border-red-500");
                card.classList.add("border-blue-500");

                // đổi nút
                this.innerHTML = `
                    <span class="material-symbols-outlined">check_circle</span>
                    HOÀN THÀNH
                `;
                this.classList.remove("bg-primary");
                this.classList.add("bg-blue-500");

                cookingColumn.appendChild(card);
            });
        }

    });


    // =========================
    // 4. HOÀN THÀNH
    // =========================
    document.querySelectorAll("button").forEach(btn => {

        if (btn.innerText.includes("HOÀN THÀNH")) {

            btn.addEventListener("click", function () {

                const card = this.closest(".bg-background-dark");

                const doneColumn = document.querySelectorAll("section")[2]
                    .querySelector(".space-y-3");

                // đổi màu
                card.classList.remove("border-blue-500");
                card.classList.add("border-green-500");

                // bỏ nút
                this.remove();

                doneColumn.appendChild(card);
            });
        }

    });


    // =========================
    // 5. LOG DEBUG (nếu cần)
    // =========================
    console.log("Kitchen JS loaded ✅");

});