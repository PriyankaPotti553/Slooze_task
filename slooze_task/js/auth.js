// SIGNUP
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === user.email)) {
      alert("User already exists");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.email === email.value && u.password === password.value
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", user.role);
    localStorage.setItem("currentUser", user.name);

    window.location.href =
      user.role === "Manager" ? "dashboard.html" : "products.html";
  });
}
