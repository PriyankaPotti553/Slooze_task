(function () {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
})();

function toggleTheme() {
  const current = localStorage.getItem("theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  document.body.classList.remove("light", "dark");
  document.body.classList.add(next);
  window.dispatchEvent(new Event("themeChanged"));
}

window.toggleTheme = toggleTheme;
