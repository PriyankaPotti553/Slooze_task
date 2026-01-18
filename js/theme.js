// THEME HANDLER – SLOOZE FRONTEND CHALLENGE

// Apply saved theme on page load
(function () {
  const theme = localStorage.getItem("theme") || 'dark';
  document.body.classList.remove('light','dark');
  document.body.classList.add(theme);
})();

// Toggle theme between light and dark
function toggleTheme() {
  const current = localStorage.getItem('theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  document.body.classList.remove('light','dark');
  document.body.classList.add(next);
  // notify others (nav) that theme changed
  try { window.dispatchEvent(new Event('themeChanged')); } catch(e){}
}

// expose to global so nav can use it
window.toggleTheme = toggleTheme;