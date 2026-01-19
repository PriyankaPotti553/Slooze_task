const loggedIn = localStorage.getItem("loggedIn");
const role = localStorage.getItem("role");

if (loggedIn !== "true") {
  window.location.href = "./login.html";
} else if (role !== "Manager") {
  alert("Access denied: Managers only");
  window.location.href = "./products.html";
}

// Populate dashboard metrics dynamically from localStorage
function updateDashboardMetrics() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const total = Array.isArray(products) ? products.length : 0;
  // low stock threshold can be tuned; use 5 for demo
  const lowStock = Array.isArray(products) ? products.filter(p => Number(p.stock) < 5).length : 0;

  const pc = document.getElementById('product-count');
  const lc = document.getElementById('lowstock-count');
  if (pc) pc.textContent = total;
  if (lc) lc.textContent = lowStock;
}

// run once on load
document.addEventListener('DOMContentLoaded', () => {
  updateDashboardMetrics();
  // listen for updates from products page
  window.addEventListener('productsUpdated', updateDashboardMetrics);
  // also update if localStorage changes in another tab
  window.addEventListener('storage', (e) => {
    if (e.key === 'products') updateDashboardMetrics();
  });
});
