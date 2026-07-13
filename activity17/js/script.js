const state = {
  products: [],       // filled by fetch()
  searchTerm: "",      // updated by the search input listener
  activeCategory: "all", // updated by filter button listeners
  cart: [],            // updated by "Add to cart" / "Clear cart" listeners
  loading: true,
};

const statusEl = document.querySelector("#status");
const gridEl = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelector("#filterButtons");
const cartListEl = document.querySelector("#cartList");
const cartCountEl = document.querySelector("#cartCount");
const cartTotalEl = document.querySelector("#cartTotal");
const clearCartBtn = document.querySelector("#clearCartBtn");

async function loadProducts() {
  state.loading = true;
  render();

  try {
    const response = await fetch("data/data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    state.products = data;
    state.loading = false;
    statusEl.textContent = `Loaded ${data.length} products.`;
  } catch (err) {
    state.loading = false;
    statusEl.textContent = `Failed to load products: ${err.message}`;
    console.error(err);
  }

  render();
}

function getVisibleProducts() {
  return state.products.filter((p) => {
    const matchesCategory =
      state.activeCategory === "all" || p.category === state.activeCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(state.searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

// a) Search input — fires on every keystroke
searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  render();
});

// b) Filter buttons — event delegation: one listener, many buttons
filterButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  state.activeCategory = btn.dataset.category;

  // update active styling
  filterButtons
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.toggle("active", b === btn));

  render();
});

// c) Add-to-cart buttons — delegated listener on the grid container,
//    since product cards are created dynamically after fetch resolves
gridEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const product = state.products.find((p) => p.id === id);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }

  render();
});

// d) Clear cart button
clearCartBtn.addEventListener("click", () => {
  state.cart = [];
  render();
});

function render() {
  // Status / loading state
  if (state.loading) {
    statusEl.textContent = "Loading products…";
  }

  // Product grid
  const visible = getVisibleProducts();
  gridEl.innerHTML = visible
    .map(
      (p) => `
      <div class="card">
        <span class="cat">${p.category}</span>
        <h3>${p.name}</h3>
        <span class="price">$${p.price.toFixed(2)}</span>
        <span class="stock">${p.stock} in stock</span>
        <button class="add-btn" data-id="${p.id}" ${p.stock === 0 ? "disabled" : ""}>
          ${p.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    `
    )
    .join("");

  if (!state.loading && visible.length === 0) {
    gridEl.innerHTML = `<p style="color:var(--muted)">No products match your search.</p>`;
  }

  // Cart
  cartListEl.innerHTML = state.cart
    .map(
      (item) => `
      <li>
        <span>${item.name} × ${item.qty}</span>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      </li>
    `
    )
    .join("");

  const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  cartCountEl.textContent = totalItems;
  cartTotalEl.textContent = totalPrice.toFixed(2);
}

//load products
loadProducts();