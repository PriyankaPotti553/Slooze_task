function logout() {
  // clear session-related keys but preserve users and theme
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('role');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
