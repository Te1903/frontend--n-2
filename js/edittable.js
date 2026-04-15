// ===== LẤY ID TỪ URL =====
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ===== LẤY DATA =====
let tables = JSON.parse(localStorage.getItem("tables")) || [];
let current = tables.find(t => t.id == id);

// ===== SELECT ELEMENT =====
const nameInput = document.querySelector('input[type="text"]');
const capacityInput = document.querySelector('input[type="number"]');
const areaSelect = document.querySelector("select");
const statusToggle = document.querySelector('input[type="checkbox"]');
const closeBtn = document.querySelector("header button");
const saveBtn = document.querySelector("footer button");
const qrBtn = document.querySelector(".downloadQR");

// ===== LOAD DATA =====
if (current) {
  nameInput.value = current.name || "";
  capacityInput.value = current.capacity || 0;
  areaSelect.value = current.area || "tang-1";
  statusToggle.checked = current.active ?? true;

  generateQR(current.name);
}

// ===== ĐÓNG =====
closeBtn.onclick = () => {
  window.location.href = "Table_Management.html";
};

// ===== LƯU =====
saveBtn.onclick = () => {
  const name = nameInput.value.trim();
  const capacity = capacityInput.value;
  const area = areaSelect.value;
  const active = statusToggle.checked;

  if (name === "") {
    alert("Nhập tên bàn!");
    return;
  }

  if (current) {
    current.name = name;
    current.capacity = capacity;
    current.area = area;
    current.active = active;
  }

  localStorage.setItem("tables", JSON.stringify(tables));

  alert("Cập nhật thành công!");
  window.location.href = "Table_Management.html";
};

// ===== QR CODE =====
function generateQR(text) {
  const img = document.querySelector("img");

  // dùng API free tạo QR
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
}

// ===== DOWNLOAD QR =====
document.querySelectorAll("button").forEach(btn => {
  if (btn.innerText.includes("Tải ảnh QR")) {
    btn.onclick = () => {
      const img = document.querySelector("img").src;

      const a = document.createElement("a");
      a.href = img;
      a.download = "QR_Ban.png";
      a.click();
    };
  }
});

// ===== ZOOM QR =====
document.querySelector("img").onclick = () => {
  window.open(document.querySelector("img").src, "_blank");
};

// Lấy dữ liệu từ URL (?id=...)
const tableId = params.get("id") || "unknown";

// Tạo nội dung QR (link gọi món)
const qrData = `http://localhost/menu.html?table=${tableId}`;

// Gán QR vào ảnh
document.getElementById("qrImage").src =
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;