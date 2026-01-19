function logout() {
  // Clear minimal session state and redirect to login
  try {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
  } catch (e) {
    console.warn('Logout cleanup failed', e);
  }
  window.location.href = './login.html';
}

window.logout = logout;
