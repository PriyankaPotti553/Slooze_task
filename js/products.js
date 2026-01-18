const loggedIn = localStorage.getItem("loggedIn");
if (loggedIn !== "true") {
  window.location.href = "login.html";
}

const defaultProducts = [
  { name: "Rice", stock: 14 },
  { name: "Wheat", stock: 10 },
  { name: "Sugar", stock: 5 },
  { name: "Potato", stock: 15 },
  { name: "Onions", stock: 12 }
];

const products =
  JSON.parse(localStorage.getItem("products")) || defaultProducts;

const list = document.getElementById("product-list");

function render() {
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

    viewBtn.onclick = () =>
      alert(`${p.name}\nStock: ${p.stock}`);

    editBtn.onclick = () => {
      if (localStorage.getItem("role") !== "Manager") {
        alert("Only Managers can edit products");
        return;
      }
      const ns = prompt("New stock:", p.stock);
      if (ns && !isNaN(ns)) {
        products[i].stock = Number(ns);
        localStorage.setItem("products", JSON.stringify(products));
        render();
      }
    };

    list.appendChild(card);
  });
}

render();

// Search
const search = document.getElementById("search");
if (search) {
  search.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    [...list.children].forEach(card => {
      card.style.display = card
        .querySelector("h3")
        .textContent.toLowerCase()
        .includes(q)
        ? ""
        : "none";
    });
  });
}
