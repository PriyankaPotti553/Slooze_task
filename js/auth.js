// SIGNUP
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Safely select inputs that exist inside the signup form
    const nameInput = signupForm.querySelector("#name");
    const emailInput = signupForm.querySelector("#email");
    const passwordInput = signupForm.querySelector("#password");
    const roleSelect = signupForm.querySelector("#role");

    const user = {
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      password: passwordInput ? passwordInput.value : "",
      role: roleSelect ? roleSelect.value : "",
    };

    // Basic validation
    if (!user.name || !user.email || !user.password || !user.role) {
      alert("Please fill in all fields and select a role.");
      return;
    }

    // store users array in localStorage to support multiple accounts
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.email === user.email);
    if (exists) {
      alert('An account with this email already exists. Please login.');
      window.location.href = 'login.html';
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created!');
    window.location.href = 'login.html';
  });
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = loginForm.querySelector("#email");
    const passwordInput = loginForm.querySelector("#password");

    // load users array and authenticate
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.length === 0) {
      alert('No accounts found. Please sign up first.');
      window.location.href = 'signup.html';
      return;
    }

    const enteredEmail = emailInput ? emailInput.value.trim() : '';
    const enteredPassword = passwordInput ? passwordInput.value : '';

    const matched = users.find(u => u.email === enteredEmail && u.password === enteredPassword);
    if (matched) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('role', matched.role);
      localStorage.setItem('currentUser', matched.email);

      if (matched.role === 'Manager') {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'products.html';
      }
    } else {
      alert('Invalid credentials');
    }
  });
}
