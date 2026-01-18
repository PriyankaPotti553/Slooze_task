// protect route: require loggedIn
const loggedIn = localStorage.getItem('loggedIn');
if (loggedIn !== 'true') {
  window.location.href = 'login.html';
} else {
  // load products from localStorage or fallback to defaults
  const defaultProducts = [
    { name: 'Rice', stock: 20 },
    { name: 'Wheat', stock: 10 },
    { name: 'Sugar', stock: 5 },
  ];

  const products = JSON.parse(localStorage.getItem('products') || JSON.stringify(defaultProducts));

  const list = document.getElementById('product-list');
  products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} - Stock: ${p.stock}`;
    list.appendChild(li);
  });

  // if Manager, show simple add-product form (if present in DOM)
  const role = localStorage.getItem('role');
  if (role === 'Manager') {
    const addForm = document.getElementById('add-product-form');
    if (addForm) {
      addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('product-name').value.trim();
        const stock = parseInt(document.getElementById('product-stock').value, 10) || 0;
        if (!name) return alert('Enter product name');
        products.push({ name, stock });
        localStorage.setItem('products', JSON.stringify(products));
        const li = document.createElement('li');
        li.textContent = `${name} - Stock: ${stock}`;
        list.appendChild(li);
        addForm.reset();
      });
    }
  }
}
