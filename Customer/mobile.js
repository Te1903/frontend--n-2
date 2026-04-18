// =====================
// 🔥 STORAGE
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =====================
// 🔥 INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ FULL SYSTEM RUN");

    bindAddButtons();
    bindCartButton();
    bindCartActions();
    bindChat();
    bindSearch();
    bindOrderButton();
    bindBackButton();
    syncCartUI();
    updateCartUI();
    updateTotal();
    renderCart(); 
        if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendChat();
            }
        });
    }
});


// =====================
// 🔥 ADD TO CART (MENU)
// =====================
function bindAddButtons() {

    document.querySelectorAll("button").forEach(btn => {

        const icon = btn.querySelector(".material-symbols-outlined");

        if (icon && icon.textContent.trim() === "add") {

            btn.onclick = () => {

                const card = btn.closest(".flex.flex-col");

                const name = card.querySelector("h4")?.innerText || "Món";

                let priceText = card.querySelector("span")?.innerText || "0";
                let price = parseInt(priceText.replace(/[^\d]/g, ""));

                addToCart(name, price);

                alert("✅ Đã thêm: " + name);
            };
        }
    });
}


// =====================
// 🔥 ADD TO CART CORE
// =====================
function addToCart(name, price) {

    const item = cart.find(i => i.name === name);

    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });

    saveCart();
}


// =====================
// 🔥 SAVE
// =====================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}


// =====================
// 🔥 UPDATE ICON CART
// =====================
function updateCartUI() {

    const count = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

    // badge số lượng
    const badge = document.querySelector(".shopping_bag + span");
    if (badge) badge.innerText = count;

    // 🔥 FIX CHUẨN GIÁ (CỰC CHUẨN)
    const cartBtn = document.querySelector(".fixed.bottom-6 button");

    if (cartBtn) {
        const spans = cartBtn.querySelectorAll("span");

        // span cuối cùng chính là giá
        const totalText = spans[spans.length - 1];

        if (totalText) {
            totalText.innerText = formatMoney(total);
        }
    }
}

// =====================
// 🔥 FORMAT MONEY
// =====================
function formatMoney(n) {
    return n.toLocaleString("vi-VN") + "đ";
}


// =====================
// 🔥 CART BUTTON
// =====================
function bindCartButton() {

    const btn = document.querySelector(".fixed.bottom-6 button");

    if (btn) {
        btn.onclick = () => window.location.href = "Shopping_Cart.html";
    }
}


// =====================
// 🔥 CART ACTIONS (+ - x)
// =====================
function bindCartActions() {

    const items = document.querySelectorAll("main > div");

    items.forEach((item, index) => {

        const buttons = item.querySelectorAll("button");

        buttons.forEach(btn => {

            const icon = btn.querySelector(".material-symbols-outlined")?.innerText.trim();

            // ➕
            if (icon === "add") {
                btn.onclick = () => {
                    if (!cart[index]) return;

                    cart[index].qty++;

                    item.querySelector("span.w-4").innerText = cart[index].qty;

                    updateItemPrice(item, cart[index]);

                    saveCart();
                    updateTotal();
                };
            }

            // ➖
            if (icon === "remove") {
                btn.onclick = () => {
                    if (!cart[index]) return;

                    cart[index].qty--;

                    if (cart[index].qty <= 0) {
                        cart.splice(index, 1);
                        item.remove();
                    } else {
                        item.querySelector("span.w-4").innerText = cart[index].qty;
                        updateItemPrice(item, cart[index]);
                    }

                    saveCart();
                    updateTotal();
                };
            }

            // 🗑
            if (icon === "delete") {
                btn.onclick = () => {
                    cart.splice(index, 1);
                    item.remove();

                    saveCart();
                    updateTotal();
                };
            }
        });
    });
}


// =====================
// 🔥 UPDATE PRICE 1 ITEM
// =====================
function updateItemPrice(item, data) {
    const priceEl = item.querySelector(".text-primary");
    if (priceEl) {
        priceEl.innerText = formatMoney(data.price * data.qty);
    }
}


// =====================
// 🔥 SYNC CART UI
// =====================
function syncCartUI() {

    const items = document.querySelectorAll("main > div");

    items.forEach((item, index) => {

        if (!cart[index]) return;

        const qtyEl = item.querySelector("span.w-4");
        if (qtyEl) qtyEl.innerText = cart[index].qty;

        updateItemPrice(item, cart[index]);
    });

    updateTotal();
}


// =====================
// 🔥 UPDATE TOTAL
// =====================
function updateTotal() {

    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.qty;
    }, 0);

    const fee = Math.round(subtotal * 0.05);
    const total = subtotal + fee;

    const rows = document.querySelectorAll("footer .flex");

    if (rows.length >= 3) {

        rows[0].querySelector("span:last-child").innerText = formatMoney(subtotal);
        rows[1].querySelector("span:last-child").innerText = formatMoney(fee);
        rows[2].querySelector("span:last-child").innerText = formatMoney(total);
    }
}


// =====================
// 🔥 ORDER BUTTON
// =====================
function bindOrderButton() {

    const btn = document.querySelector("footer button");

    if (!btn) return;

    btn.onclick = () => {

        if (cart.length === 0) {
            alert("❗ Chưa có món để đặt");
            return;
        }

        alert("✅ Đặt hàng thành công!");

        localStorage.setItem("status", "cooking");

        cart = [];
        localStorage.removeItem("cart");

        window.location.href = "MenuOrder.html";
    };
}


// =====================
// 🔥 CHATBOT
// =====================
function bindChat() {

    window.sendChat = function () {

        const input = document.getElementById("chat-input");
        if (!input) return;

        const msg = input.value.trim();
        if (!msg) return;

        const chatBox = document.querySelector("main");

        // ======================
        // 👤 USER MESSAGE
        // ======================
        const userMsg = document.createElement("div");
        userMsg.className = "flex items-end gap-3 justify-end ml-auto max-w-[85%]";
        userMsg.innerHTML = `
            <div class="flex flex-col gap-1 items-end">
                <span class="text-[11px] text-slate-400">Bạn</span>
                <div class="bg-primary text-background-dark rounded-xl px-4 py-2">
                    ${msg}
                </div>
            </div>
        `;
        chatBox.appendChild(userMsg);


        // ======================
        // 🤖 BOT RESPONSE
        // ======================
        let reply = "🤖 Tôi chưa hiểu";

        if (msg.toLowerCase().includes("burger")) {
            reply = "🍔 Đã thêm Burger vào giỏ";
            addToCart("Wagyu Beef Burger", 250000);
        }

        else if (msg.toLowerCase().includes("salad")) {
            reply = "🥗 Đã thêm Salad";
            addToCart("Salmon Poke Bowl", 180000);
        }

        else if (msg.toLowerCase().includes("thanh toán")) {
            reply = "🧾 Đang chuyển sang thanh toán...";
            setTimeout(() => sendOrder(), 1000);
        }

        else if (msg.toLowerCase().includes("nhân viên")) {
            reply = "👨‍🍳 Nhân viên đang tới!";
        }


        const botMsg = document.createElement("div");
        botMsg.className = "flex items-end gap-3 max-w-[85%]";
        botMsg.innerHTML = `
            <div class="flex flex-col gap-1">
                <span class="text-[11px] text-primary">Bot</span>
                <div class="bg-primary/10 rounded-xl px-4 py-2">
                    ${reply}
                </div>
            </div>
        `;

        setTimeout(() => {
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 300);

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    };
}

// =====================
// 🔥 SEARCH
// =====================
function bindSearch() {

    const input = document.querySelector("input[placeholder*='Search'], input[placeholder*='Tìm']");

    if (!input) return;

    input.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const items = document.querySelectorAll(".grid div");

        items.forEach(item => {

            const name = item.querySelector("h4")?.innerText.toLowerCase() || "";
            const desc = item.querySelector("p")?.innerText.toLowerCase() || "";

            item.style.display =
                (name.includes(keyword) || desc.includes(keyword))
                    ? "flex"
                    : "none";
        });
    });
}


// =====================
// 🔥 SEND ORDER (CHATBOT)
// =====================
function sendOrder() {

    if (cart.length === 0) {
        alert("❗ Chưa có món");
        return;
    }

    alert("✅ Đặt hàng thành công!");

    localStorage.setItem("status", "cooking");

    cart = [];
    localStorage.removeItem("cart");

    window.location.href = "MenuOrder.html";
}
function bindBackButton() {

    const btn = document.querySelector("header button");

    if (!btn) return;

    btn.onclick = () => {

        // quay lại trang trước
        if (document.referrer) {
            window.history.back();
        } else {
            // fallback nếu mở trực tiếp
            window.location.href = "Menu.html";
        }
    };
}

function renderCart() {

    const container = document.querySelector("main");

    if (!container) return;

    // xoá hết item cũ
    container.innerHTML = "";

    cart.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "flex items-center gap-4 bg-white dark:bg-primary/5 p-3 rounded-xl border border-slate-100 dark:border-primary/10";

        div.innerHTML = `
            <div class="size-20 bg-gray-200 rounded-lg"></div>

            <div class="flex flex-col flex-1">
                <p class="font-bold">${item.name}</p>
                <p class="text-primary">${formatMoney(item.price * item.qty)}</p>

                <div class="flex items-center justify-between mt-2">

                <div class="flex items-center gap-3 bg-slate-100 dark:bg-primary/20 rounded-full px-2 py-1">
                        <button><span class="material-symbols-outlined">remove</span></button>
                        <span class="w-4 text-center">${item.qty}</span>
                        <button><span class="material-symbols-outlined">add</span></button>
                    </div>

                    <button>
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });

    // bind lại nút sau khi render
    bindCartActions();
    updateTotal();
}

function bindTabs() {

    const tabs = document.querySelectorAll(".border-b a");
    const items = document.querySelectorAll(".grid > div");

    tabs.forEach(tab => {

        tab.onclick = (e) => {
            e.preventDefault();

            // bỏ active cũ
            tabs.forEach(t => {
                t.classList.remove("border-primary", "text-primary");
                t.classList.add("border-transparent", "text-slate-500");
            });

            // active tab mới
            tab.classList.add("border-primary", "text-primary");
            tab.classList.remove("border-transparent", "text-slate-500");

            const text = tab.innerText.trim().toLowerCase();

            items.forEach(item => {

                const name = item.querySelector("h4")?.innerText.toLowerCase() || "";

                if (text === "tất cả") {
                    item.style.display = "flex";
                }

                else if (text === "thức ăn") {
                    if (name.includes("burger") || name.includes("pizza") || name.includes("salad")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                }

                else if (text === "thức uống") {
                    if (name.includes("latte") || name.includes("coffee") || name.includes("fashioned")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                }

                else if (text === "tráng miệng") {
                    if (name.includes("donut")) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                }
            });
        };
    });
}
bindTabs();


