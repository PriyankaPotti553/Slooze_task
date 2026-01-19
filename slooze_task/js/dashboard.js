// Only Manager should access dashboard
const role = localStorage.getItem("role");
if (role !== "Manager") {
  window.location.href = "./products.html";
}

// Read products
const products = JSON.parse(localStorage.getItem("products")) || [];

// Metrics
const totalProducts = products.length;

const totalQuantity = products.reduce(
  (sum, p) => sum + Number(p.quantity || 0),
  0
);

const lowStockCount = products.filter(
  p => Number(p.quantity) <= 10
).length;

// Update UI
document.getElementById("total-products").textContent = totalProducts;
document.getElementById("total-quantity").textContent = totalQuantity;
document.getElementById("low-stock").textContent = lowStockCount;
