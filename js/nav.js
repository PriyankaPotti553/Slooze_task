// Dynamically render header/navigation based on login + role
(function(){
  function createHeader(){
    // do not render the top navigation on auth pages to keep auth UI compact
    const pathname = window.location.pathname || '';
    if (pathname.endsWith('login.html') || pathname.endsWith('signup.html')) {
      return; // skip rendering header on login/signup pages
    }

    const header = document.createElement('header');
    header.className = 'site-header';

    const brand = document.createElement('div');
    brand.className = 'brand';
    brand.textContent = 'Slooze';

    const nav = document.createElement('nav');
    nav.className = 'nav-links';

    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const role = localStorage.getItem('role');

    // Home link: role-aware
    const home = document.createElement('a');
    const hasLoggedIn = loggedIn;
    if (!hasLoggedIn) {
      home.href = 'login.html';
    } else {
      home.href = role === 'Manager' ? 'dashboard.html' : 'products.html';
    }
    home.textContent = 'Home';
    nav.appendChild(home);

    if (loggedIn && role === 'Manager'){
      const dash = document.createElement('a'); dash.href='dashboard.html'; dash.textContent='Dashboard'; nav.appendChild(dash);
    }

    const products = document.createElement('a'); products.href='products.html'; products.textContent='Products'; nav.appendChild(products);

    if (!loggedIn){
      const login = document.createElement('a'); login.href='login.html'; login.textContent='Login'; login.className='button'; nav.appendChild(login);
      const signup = document.createElement('a'); signup.href='signup.html'; signup.textContent='Sign Up'; nav.appendChild(signup);
    } else {
      const user = document.createElement('span'); user.textContent = localStorage.getItem('currentUser') || '';
      user.style.opacity = 0.9; user.style.marginRight = '0.5rem'; nav.appendChild(user);
      const logout = document.createElement('a'); logout.href='#'; logout.textContent='Logout'; logout.onclick = function(e){ e.preventDefault(); logoutFn(); }; nav.appendChild(logout);
    }

    // theme toggle
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn';
    themeBtn.style.marginLeft = '0.5rem';
      function refreshThemeLabel(){
        const t = localStorage.getItem('theme') || 'dark';
        themeBtn.textContent = t === 'dark' ? 'Switch to Light' : 'Switch to Dark';
      }
      themeBtn.onclick = function(e){ e.preventDefault(); if (window.toggleTheme) { window.toggleTheme(); } };
      // update label on events
      window.addEventListener('themeChanged', refreshThemeLabel);
    refreshThemeLabel();
    nav.appendChild(themeBtn);

    header.appendChild(brand);
    header.appendChild(nav);
    document.body.insertBefore(header, document.body.firstChild);
  }

  // export logout if available
  function logoutFn(){
    if (typeof window.logout === 'function') return window.logout();
    localStorage.removeItem('loggedIn'); localStorage.removeItem('role'); localStorage.removeItem('currentUser'); window.location.href='login.html';
  }

  // run
  document.addEventListener('DOMContentLoaded', createHeader);
})();