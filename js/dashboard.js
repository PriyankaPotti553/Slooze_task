// protect dashboard route: require loggedIn and Manager role
const loggedIn = localStorage.getItem('loggedIn');
const role = localStorage.getItem('role');
if (loggedIn !== 'true') {
  // not logged in
  window.location.href = 'login.html';
} else if (role !== 'Manager') {
  alert('Access denied: Managers only');
  window.location.href = 'products.html';
}
