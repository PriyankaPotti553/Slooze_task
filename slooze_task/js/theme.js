(function () {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(theme);
})();

function toggleTheme() {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  document.body.classList.remove("dark", "light");
  document.body.classList.add(next);
  localStorage.setItem("theme", next);
}
