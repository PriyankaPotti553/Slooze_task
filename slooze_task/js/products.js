// ===============================
// RBAC ROLE
// ===============================
const role = localStorage.getItem("role");

// ===============================
// DOM ELEMENTS
// ===============================
const productsDiv = document.getElementById("products");
const addForm = document.getElementById("add-product");
const addFormBox = document.getElementById("add-product-form");

// ===============================
// INITIAL PRODUCTS (FIRST LOAD)
// ===============================
function getProducts() {
  const stored = localStorage.getItem("products");
  if (stored) return JSON.parse(stored);

  const initialProducts = [
    { id: 1, name: "Rice", quantity: 50 },
    { id: 2, name: "Wheat", quantity: 30 },
    { id: 3, name: "Sugar", quantity: 20 }
  ];

  localStorage.setItem("products", JSON.stringify(initialProducts));
  return initialProducts;
}

let products = getProducts();

// ===============================
// SAVE PRODUCTS
// ===============================
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// ===============================
// RENDER PRODUCTS (VIEW)
// ===============================
function renderProducts() {
  productsDiv.innerHTML = "";

  if (products.length === 0) {
    productsDiv.innerHTML = "<p>No products available</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p class="product-meta">Quantity: ${product.quantity}</p>
    `;

    // MANAGER CONTROLS
    if (role === "Manager") {
      const editBtn = document.createElement("button");
      editBtn.className = "btn primary";
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editProduct(product.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn danger";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteProduct(product.id);

      card.appendChild(editBtn);
      card.appendChild(deleteBtn);
    }

    productsDiv.appendChild(card);
  });
}

// ===============================
// ADD PRODUCT (MANAGER ONLY)
// ===============================
function addProduct(e) {
  e.preventDefault();

  if (role !== "Manager") {
    alert("Only Managers can add products");
    return;
  }

  const nameInput = document.getElementById("product-name");
  const qtyInput = document.getElementById("product-qty");

  const name = nameInput.value.trim();
  const quantity = Number(qtyInput.value);

  if (!name || quantity <= 0) {
    alert("Enter valid product name and quantity");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    quantity
  });

  saveProducts();
  renderProducts();

  nameInput.value = "";
  qtyInput.value = "";
}

// ===============================
// EDIT PRODUCT (MANAGER ONLY)
// ===============================
function editProduct(id) {
  if (role !== "Manager") return;

  const product = products.find(p => p.id === id);
  if (!product) return;

  const newName = prompt("Edit product name:", product.name);
  if (!newName) return;

  const newQty = prompt("Edit quantity:", product.quantity);
  if (newQty === null || Number(newQty) <= 0) return;

  product.name = newName.trim();
  product.quantity = Number(newQty);

  saveProducts();
  renderProducts();
}

// ===============================
// DELETE PRODUCT (MANAGER ONLY)
// ===============================
function deleteProduct(id) {
  if (role !== "Manager") return;

  if (!confirm("Are you sure you want to delete this product?")) return;

  products = products.filter(p => p.id !== id);
  saveProducts();
  renderProducts();
}

// ===============================
// UI RESTRICTIONS
// ===============================
if (role !== "Manager" && addFormBox) {
  addFormBox.style.display = "none";
}

// ===============================
// EVENT LISTENERS
// ===============================
if (addForm && role === "Manager") {
  addForm.addEventListener("submit", addProduct);
}

// ===============================
// INITIAL RENDER
// ===============================
renderProducts();
