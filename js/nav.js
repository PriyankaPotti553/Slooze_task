(function () {
  function createHeader() {
    const path = window.location.pathname;
    if (path.endsWith("login.html") || path.endsWith("signup.html")) return;

    const header = document.createElement("header");
    header.className = "site-header";

    const brand = document.createElement("div");
    brand.className = "brand";
    brand.textContent = "Slooze";

    const nav = document.createElement("nav");
    nav.className = "nav-links";

    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const role = localStorage.getItem("role");

    const home = document.createElement("a");
    home.href = loggedIn
      ? role === "Manager" ? "dashboard.html" : "products.html"
      : "login.html";
    home.textContent = "Home";
    nav.appendChild(home);

    if (loggedIn && role === "Manager") {
      const dash = document.createElement("a");
      dash.href = "dashboard.html";
      dash.textContent = "Dashboard";
      nav.appendChild(dash);
    }

    const products = document.createElement("a");
    products.href = "products.html";
    products.textContent = "Products";
    nav.appendChild(products);

    if (!loggedIn) {
      const login = document.createElement("a");
      login.href = "login.html";
      login.textContent = "Login";
      login.className = "button";
      nav.appendChild(login);
    } else {
      const user = document.createElement("span");
      user.textContent = localStorage.getItem("currentUser");
      user.style.marginRight = "0.5rem";
      nav.appendChild(user);

      const logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.textContent = "Logout";
      logoutLink.onclick = e => {
        e.preventDefault();
        logout();
      };
      nav.appendChild(logoutLink);
    }

    const themeBtn = document.createElement("button");
    themeBtn.className = "btn";
    themeBtn.onclick = () => window.toggleTheme();
    themeBtn.textContent =
      (localStorage.getItem("theme") || "dark") === "dark"
        ? "Light Mode"
        : "Dark Mode";
    window.addEventListener("themeChanged", () => {
      themeBtn.textContent =
        (localStorage.getItem("theme") || "dark") === "dark"
          ? "Light Mode"
          : "Dark Mode";
    });

    nav.appendChild(themeBtn);

    header.appendChild(brand);
    header.appendChild(nav);
    document.body.prepend(header);
  }

  document.addEventListener("DOMContentLoaded", createHeader);
})();
