// Copied from Frontend/js/auth.js — no logic changes, only path assumptions updated in HTML
// SIGNUP
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = signupForm.querySelector("#name");
    const emailInput = signupForm.querySelector("#email");
    const passwordInput = signupForm.querySelector("#password");
    const roleSelect = signupForm.querySelector("#role");

    const user = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      role: roleSelect.value,
    };

    if (!user.name || !user.email || !user.password || !user.role) {
      alert("Please fill in all fields and select a role.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === user.email)) {
      alert("Account already exists. Please login.");
      window.location.href = "./login.html";
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully!");
    window.location.href = "./login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector("#email").value.trim();
    const password = loginForm.querySelector("#password").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", user.role);
    localStorage.setItem("currentUser", user.email);

    window.location.href =
      user.role === "Manager" ? "./dashboard.html" : "./products.html";
  });
}
