document.addEventListener("DOMContentLoaded", function () {

    let tables = JSON.parse(localStorage.getItem("tables")) || [];

    const nameInput = document.querySelector('input[type="text"]');
    const saveBtn = document.querySelector("footer button");

    // ====== LẤY KHU VỰC RADIO ======
    function getArea() {
        const checked = document.querySelector('input[name="area"]:checked');
        return checked ? checked.value : "normal";
    }

    // ====== QR ======
    const qrImg = document.getElementById("qrImage");

    function updateQR() {
        if (!qrImg) return;

        const tableName = nameInput.value || "new";
        const area = getArea();

        const qrData = `http://localhost/menu.html?table=${tableName}&area=${area}`;

        qrImg.src =
            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    }

    updateQR();

    nameInput.addEventListener("input", updateQR);

    document.querySelectorAll('input[name="area"]').forEach(radio => {
        radio.addEventListener("change", updateQR);
    });

    // ====== NÚT ĐÓNG ======
    document.querySelector("header button").onclick = () => {
        window.location.href = "Table_Management.html";
    };

    // ====== SAVE ======
    saveBtn.onclick = () => {

        const name = nameInput.value.trim();
        const area = getArea();

        if (name === "") {
            alert("Vui lòng nhập số bàn!");
            return;
        }

        tables.push({
            id: Date.now(),
            name,
            area,
            active: true
        });

        localStorage.setItem("tables", JSON.stringify(tables));

        alert("Thêm bàn thành công!");

        window.location.href = "Table_Management.html?reload=" + Date.now();    };
});