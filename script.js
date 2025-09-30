// =========================
// 🌟 SCRIPT.JS — WORLD-CLASS FIXED WITH MULTI-CATEGORY SUPPORT
// =========================

// ========== ELEMENTS ==========
const themeToggle = document.getElementById("theme-toggle");
const reactiveBackground = document.querySelector(".reactive-background");
const cursor = document.querySelector(".cursor");
const menuToggle = document.getElementById("menu-toggle");
const categoryItems = document.querySelector(".category-items");

// ========== INITIAL THEME ==========
document.body.classList.add("dark-mode"); // Start in dark mode
if (themeToggle) themeToggle.textContent = "☀️";

// ========== THEME TOGGLE ==========
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
            if (cursor) {
                cursor.style.background = "rgba(0, 255, 255, 0.3)";
                cursor.style.borderColor = "#00ffff";
            }
        } else {
            themeToggle.textContent = "🌙";
            if (cursor) {
                cursor.style.background = "rgba(255, 152, 0, 0.3)";
                cursor.style.borderColor = "#ff9800";
            }
        }
    });
}

// ========== CUSTOM CURSOR ==========
if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = "block";
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    cursor.classList.add("breathe");

    document.addEventListener("mousedown", () => {
        cursor.classList.add("clickEffect");
    });
    document.addEventListener("mouseup", () => {
        cursor.classList.remove("clickEffect");
    });

    document.addEventListener("mousemove", (e) => {
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        cursor.classList.remove("hover-btn", "hover-product");

        if (hoveredElement && hoveredElement.tagName === "BUTTON") {
            cursor.classList.add("hover-btn");
        }
        if (hoveredElement && hoveredElement.closest(".product-card")) {
            cursor.classList.add("hover-product");
        }
    });
}

// ========== REACTIVE BACKGROUND ==========
function updateBackground(x, y) {
    if (!reactiveBackground) return;

    if (document.body.classList.contains("dark-mode")) {
        reactiveBackground.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(20,20,20,0.8), rgba(40,40,40,0.8), rgba(60,60,60,0.8))`;
    } else {
        reactiveBackground.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,152,0,0.6), rgba(255,102,0,0.6), rgba(255,69,0,0.6))`;
    }
}

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    updateBackground(x, y);
});

document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
        const x = e.touches[0].clientX / window.innerWidth;
        const y = e.touches[0].clientY / window.innerHeight;
        updateBackground(x, y);
    }
});

// ========== CATEGORY MENU TOGGLE ==========
if (menuToggle && categoryItems) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        categoryItems.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!menuToggle.contains(e.target) && !categoryItems.contains(e.target)) {
            categoryItems.classList.remove("show");
        }
    });
}

// ========== FILTER PRODUCTS ==========
function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");
    let anyVisible = false;

    products.forEach(product => {
        const productCategories = (product.dataset.category || "").split(",").map(cat => cat.trim());

        if (category === "all" || productCategories.includes(category)) {
            product.style.display = "block";
            anyVisible = true;
        } else {
            product.style.display = "none";
        }
    });

    const noProductsMessage = document.getElementById("no-products-message");
    if (noProductsMessage) {
        noProductsMessage.style.display = anyVisible ? "none" : "block";
    }
}

document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        filterProducts(category);
        if (categoryItems) categoryItems.classList.remove("show");
    });
});

// ========== LOADER =========== //
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 500); // fade out and remove
    }
});
