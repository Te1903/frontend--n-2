document.addEventListener("DOMContentLoaded", function () {

    let tables = JSON.parse(localStorage.getItem("tables")) || [];

    renderTables();

    // ===== SEARCH =====
    const searchInput = document.querySelector("input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase();

            const filtered = tables.filter(t =>
                t.name.toLowerCase().includes(keyword)
            );

            renderTables(filtered);
        });
    }

    // ===== RENDER =====
    function renderTables(list = tables) {
        const grid = document.getElementById("tableGrid");
        if (!grid) return;

        grid.innerHTML = "";

        if (list.length === 0) {
            grid.innerHTML = `<p class="col-span-full text-center text-gray-400">Chưa có bàn nào</p>`;
            return;
        }

        list.forEach(t => {

            let statusColor = t.active ? "emerald" : "red";
            let statusText = t.active ? "Đang trống" : "Ngưng";

            grid.innerHTML += `
            <div class="group relative flex flex-col bg-orange-90 rounded-xl border shadow-sm hover:shadow-md">

                <div class="absolute top-3 right-3 flex gap-2">
                    <button onclick="goEdit(${t.id})">✏️</button>
                    <button onclick="deleteTable(${t.id})">🗑️</button>
                </div>

                <div class="p-6 flex flex-col items-center gap-4">
                    <div class="size-20 rounded-full bg-slate-100 flex items-center justify-center text-${statusColor}-500 border-4 border-${statusColor}-500/20">
                        <span class="material-symbols-outlined text-3xl">table_restaurant</span>
                    </div>

                    <div class="text-center">
                        <h3 class="font-bold">${t.name}</h3>
                        <p class="text-${statusColor}-500 text-sm">${statusText}</p>
                        <p class="text-xs text-gray-400">${t.area}</p>
                    </div>
                </div>

            </div>
            `;
        });
    }

    // ===== DELETE =====
    window.deleteTable = function(id){
        if(confirm("Xóa bàn này?")){
            tables = tables.filter(t => t.id !== id);
            localStorage.setItem("tables", JSON.stringify(tables));
            renderTables();
        }
    }

    // ===== EDIT =====
    window.goEdit = function(id){
        window.location.href = `edittable.html?id=${id}`;
    }

});