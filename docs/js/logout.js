function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("role");
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
}
