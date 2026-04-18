// ===== LẤY ELEMENT =====
const nameInput = document.querySelector("input[type='text']");
const priceInput = document.querySelector("input[type='number']");
const select = document.querySelector("select");
const statusToggle = document.querySelector("input[type='checkbox']");
const statusLabel = document.querySelector("label span");
const saveBtn = document.getElementById("saveBtn");
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");

// ===== LOAD DATA =====
let data = JSON.parse(localStorage.getItem("editMenu"));

if (data) {
  nameInput.value = data.name;
  priceInput.value = data.price.replace(/\D/g, "");

  select.value =
    data.category === "Món chính" ? "food" :
    data.category === "Đồ uống" ? "drink" :
    "dessert";

  if (data.status === "Ngừng bán") {
    statusToggle.checked = false;
    statusLabel.innerText = "Ngừng bán";
  } else {
    statusToggle.checked = true;
    statusLabel.innerText = "Đang bán";
  }
  if (data.image) {
  previewImg.src = data.image;
  previewImg.classList.remove("hidden");
}
}
if (!data) {
  alert("Không có dữ liệu!");
  window.location.href = "Menu_Management.html";
}

// ===== TOGGLE =====
statusToggle.onchange = () => {
  statusLabel.innerText = statusToggle.checked ? "Đang bán" : "Ngừng bán";
};

// ===== SAVE =====
if (saveBtn) {
  saveBtn.onclick = function () {

    const name = nameInput.value.trim();
    const price = priceInput.value;

    if (!name || !price) {
      alert("Vui lòng nhập đầy đủ!");
      return;
    }

    let menuList = JSON.parse(localStorage.getItem("menuList")) || [];

    const index = menuList.findIndex(x => x.id === data.id);

    if (index === -1) {
      alert("Không tìm thấy món!");
      return;
    }

const image = localStorage.getItem("tempImage");

menuList[index] = {
  ...menuList[index],
  name: name,
  price: Number(price).toLocaleString("vi-VN") + "đ",
  category:
    select.value === "food" ? "Món chính" :
    select.value === "drink" ? "Đồ uống" :
    "Tráng miệng",
  status: statusToggle.checked ? "Đang bán" : "Ngừng bán",
  image: image || menuList[index].image
};

// 🔥 cập nhật lại editMenu
localStorage.setItem("editMenu", JSON.stringify(menuList[index]));

// lưu list mới
    localStorage.setItem("menuList", JSON.stringify(menuList));

    alert("Cập nhật thành công!");

    window.location.href = "Menu_Management.html";
  };
}

// upload image
// ===== UPLOAD IMAGE =====

// click chọn file
uploadBox.onclick = () => fileInput.click();

fileInput.onchange = function () {
  const file = this.files[0];
  handleFile(file);
};

// drag over
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("border-primary");
});

// drag leave
uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("border-primary");
});

// drop file
uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("border-primary");

  const file = e.dataTransfer.files[0];
  handleFile(file);
});

// xử lý file
function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Vui lòng chọn ảnh!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    previewImg.src = e.target.result;
    previewImg.classList.remove("hidden");

    // lưu tạm ảnh
    localStorage.setItem("tempImage", e.target.result);
  };

  reader.readAsDataURL(file);
}
