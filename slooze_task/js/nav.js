const navbar = document.getElementById("navbar");
if (navbar) {
  const role = localStorage.getItem("role");

  navbar.innerHTML = `
    <a href="products.html">Products</a>
    ${role === "Manager" ? `<a href="dashboard.html">Dashboard</a>` : ""}
    <button onclick="toggleTheme()">Theme</button>
    <button onclick="logout()">Logout</button>
  `;
}
