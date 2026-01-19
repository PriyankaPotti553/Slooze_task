const loggedIn = localStorage.getItem("loggedIn");
if (loggedIn !== "true") {
  window.location.href = "./login.html";
}

const defaultProducts = [
  { name: "Rice", stock: 14 },
  { name: "Wheat", stock: 10 },
  { name: "Sugar", stock: 5 },
  { name: "Potato", stock: 15 },
  { name: "Onions", stock: 12 }
];

let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;

const list = document.getElementById("product-list");

function render() {
  // Ensure we always read the latest products from localStorage — this helps when
  // other parts of the app update storage or when multiple pages/tabs are open.
  const stored = JSON.parse(localStorage.getItem("products"));
  if (stored && Array.isArray(stored)) {
    // mutate the existing array reference so any other references remain valid
    products.length = 0;
    stored.forEach(p => products.push(p));
  }

  list.innerHTML = "";
  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <div class="product-meta">Stock: ${p.stock}</div>
      <div class="product-actions">
        <button class="btn">View</button>
        <button class="btn">Edit</button>
      </div>
    `;

    const [viewBtn, editBtn] = card.querySelectorAll("button");
    viewBtn.onclick = () => alert(`${p.name}\nStock: ${p.stock}`);
    editBtn.onclick = () => {
      if (localStorage.getItem("role") !== "Manager") { alert("Only Managers can edit products"); return; }
      const ns = prompt("New stock:", p.stock);
      if (ns !== null && !isNaN(ns)) {
        products[i].stock = Number(ns);
        localStorage.setItem("products", JSON.stringify(products));
        render();
        // notify other parts of the app that products changed
        window.dispatchEvent(new Event('productsUpdated'));
      }
    };
    list.appendChild(card);
  });

  // update any UI elements that show product counts (if present)
  document.querySelectorAll('.product-count').forEach(el => el.textContent = products.length);
}

render();

const search = document.getElementById("search");
if (search) {
  search.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    [...list.children].forEach(card => { card.style.display = card.querySelector("h3").textContent.toLowerCase().includes(q) ? "" : "none"; });
  });
}

// Add product form handling (Managers only)
const addForm = document.getElementById("add-product-form");
if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (localStorage.getItem("role") !== "Manager") {
      alert("Only Managers can add products");
      return;
    }

    const nameEl = document.getElementById("product-name");
    const stockEl = document.getElementById("product-stock");
    const name = nameEl ? nameEl.value.trim() : "";
    const stock = stockEl ? Number(stockEl.value) : NaN;

    if (!name) { alert("Please enter a product name"); return; }
    if (isNaN(stock) || stock < 0) { alert("Please enter a valid stock number"); return; }

    products.push({ name, stock });
    localStorage.setItem("products", JSON.stringify(products));
    render();
    addForm.reset();
  });
}
