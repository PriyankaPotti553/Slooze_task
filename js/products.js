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
  products.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.index = idx;
    const title = document.createElement('h3'); title.textContent = p.name;
    const meta = document.createElement('div'); meta.className = 'product-meta'; meta.textContent = `Stock: ${p.stock}`;
    const actions = document.createElement('div'); actions.className = 'product-actions';
    const viewBtn = document.createElement('button'); viewBtn.className = 'btn'; viewBtn.textContent = 'View';
    const editBtn = document.createElement('button'); editBtn.className = 'btn'; editBtn.textContent = 'Edit';
    actions.appendChild(viewBtn); actions.appendChild(editBtn);

    // handlers
    viewBtn.addEventListener('click', () => {
      alert(`${p.name}\nStock: ${p.stock}`);
    });

    editBtn.addEventListener('click', () => {
      const role = localStorage.getItem('role');
      if (role !== 'Manager') return alert('Only Managers can edit products');
      const newStock = prompt('Enter new stock for ' + p.name, String(p.stock));
      if (newStock === null) return;
      const ns = parseInt(newStock, 10);
      if (isNaN(ns)) return alert('Invalid number');
      products[idx].stock = ns;
      localStorage.setItem('products', JSON.stringify(products));
      meta.textContent = `Stock: ${ns}`;
    });

    card.appendChild(title); card.appendChild(meta); card.appendChild(actions);
    list.appendChild(card);
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
        // re-render list: easiest is to clear and re-run
        list.innerHTML = '';
        products.forEach((p2, i2) => {
          const card2 = document.createElement('div'); card2.className = 'product-card';
          const title2 = document.createElement('h3'); title2.textContent = p2.name;
          const meta2 = document.createElement('div'); meta2.className = 'product-meta'; meta2.textContent = `Stock: ${p2.stock}`;
          const actions2 = document.createElement('div'); actions2.className = 'product-actions';
          const viewBtn2 = document.createElement('button'); viewBtn2.className = 'btn'; viewBtn2.textContent = 'View';
          const editBtn2 = document.createElement('button'); editBtn2.className = 'btn'; editBtn2.textContent = 'Edit';
          viewBtn2.addEventListener('click', () => alert(`${p2.name}\nStock: ${p2.stock}`));
          editBtn2.addEventListener('click', () => {
            const newStock2 = prompt('Enter new stock for ' + p2.name, String(p2.stock));
            if (newStock2 === null) return;
            const ns2 = parseInt(newStock2, 10);
            if (isNaN(ns2)) return alert('Invalid number');
            products[i2].stock = ns2; localStorage.setItem('products', JSON.stringify(products));
            meta2.textContent = `Stock: ${ns2}`;
          });
          actions2.appendChild(viewBtn2); actions2.appendChild(editBtn2);
          card2.appendChild(title2); card2.appendChild(meta2); card2.appendChild(actions2);
          list.appendChild(card2);
        });
        addForm.reset();
      });
    }
  }

  // search handler
  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', function (e) {
      const q = e.target.value.toLowerCase().trim();
      const cards = Array.from(document.querySelectorAll('.product-card'));
      cards.forEach(c => {
        const title = c.querySelector('h3').textContent.toLowerCase();
        c.style.display = title.includes(q) ? '' : 'none';
      });
    });
  }
}
