// ===== LẤY ELEMENT =====
const nameInput = document.querySelector("input[type='text']");
const priceInput = document.querySelector("input[type='number']");
const select = document.querySelector("select");
const statusToggle = document.querySelector("input[type='checkbox']");
const addBtn = document.getElementById("addBtn");

// ===== CLICK THÊM =====
if (addBtn) {
  addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const price = priceInput.value;
    const category = select.value;
    const image = localStorage.getItem("tempImage");
    if (!name || !price || !category) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    let categoryText =
      category === "main" ? "Món chính" :
      category === "starter" ? "Khai vị" :
      category === "drink" ? "Đồ uống" :
      "Tráng miệng";

    const newItem = {
      id: Date.now(), 
      name: name,
      price: price + "đ",
      category: categoryText,
      status: statusToggle.checked ? "Đang bán" : "Ngừng bán",
      image: image || ""
    };

    let menuList = JSON.parse(localStorage.getItem("menuList")) || [];

    menuList.push(newItem);

    localStorage.setItem("menuList", JSON.stringify(menuList));
    localStorage.removeItem("tempImage"); 

    alert("Thêm món thành công!");

    window.location.href = "Menu_Management.html";
  });
}
// ===== UPLOAD IMAGE =====
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");

// click chọn
uploadBox.onclick = () => fileInput.click();

// chọn file
fileInput.onchange = function () {
  const file = this.files[0];
  handleFile(file);
};

// kéo vào
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("border-primary");
});

// rời
uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("border-primary");
});

// thả
uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("border-primary");

  const file = e.dataTransfer.files[0];
  handleFile(file);
});

// xử lý
function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Vui lòng chọn ảnh!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    previewImg.src = e.target.result;
    previewImg.classList.remove("hidden");

    localStorage.setItem("tempImage", e.target.result);
  };

  reader.readAsDataURL(file);
}