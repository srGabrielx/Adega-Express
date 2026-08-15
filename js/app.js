/**
 * Lógica da Interface Principal - Adega Express 15 Min
 * Catálogo Mobile-First, Busca em Tempo Real e Sincronização com Carrinho
 */

let currentCategory = "todos";
let currentSearchTerm = "";

const CATEGORIES = [
  { id: "todos", name: "Todos os Produtos", icon: "⚡" },
  { id: "combos", name: "Combos & Kits", icon: "🔥" },
  { id: "cervejas", name: "Cervejas Geladas", icon: "❄️" },
  { id: "destilados", name: "Whiskies & Destilados", icon: "🥃" },
  { id: "vinhos", name: "Vinhos & Espumantes", icon: "🍷" },
  { id: "sem-alcool", name: "Energéticos & Refrigerantes", icon: "⚡" },
  { id: "gelo-petiscos", name: "Gelo & Petiscos", icon: "🧊" }
];

function startApp() {
  // SPLASH SCREEN LOGIC
  const splash = document.getElementById("splash-screen");
  if (splash) {
    setTimeout(() => {
      splash.classList.add("hidden");
      setTimeout(() => splash.remove(), 400);
    }, 800);
  }

  initAgeGate();
  initStoreInfo();
  renderCategoryPills();
  renderCatalog();
  initSearchAndFilters();
  initHeaderScroll();
}

// Inicialização segura que previne condição de corrida de DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}

// --- VERIFICAÇÃO DE IDADE (18+) ---
function initAgeGate() {
  const modal = document.getElementById("age-gate-modal");
  const isVerified = localStorage.getItem("adega_age_verified");

  if (!isVerified && modal) {
    modal.classList.add("active");
  }

  const btnConfirm = document.getElementById("age-gate-confirm");
  const btnDeny = document.getElementById("age-gate-deny");

  if (btnConfirm) {
    btnConfirm.addEventListener("click", () => {
      localStorage.setItem("adega_age_verified", "true");
      if (modal) modal.classList.remove("active");
      cart.showToast("🔞 Bem-vindo à " + STORE_CONFIG.name + "! Beba com moderação.", "info");
    });
  }

  if (btnDeny) {
    btnDeny.addEventListener("click", () => {
      alert("A venda de bebidas alcoólicas é proibida para menores de 18 anos (Lei 8.069/1990). Redirecionando...");
      window.location.href = "https://www.google.com.br";
    });
  }
}

// --- DADOS DA LOJA NO HEADER E FOOTER ---
function initStoreInfo() {
  if (typeof STORE_CONFIG === "undefined") return;
  document.querySelectorAll(".store-name").forEach(el => el.textContent = STORE_CONFIG.name);
  document.querySelectorAll(".store-tagline").forEach(el => el.textContent = STORE_CONFIG.tagline);
  document.querySelectorAll(".store-phone-formatted").forEach(el => el.textContent = STORE_CONFIG.phoneFormatted);
  document.querySelectorAll(".store-address").forEach(el => el.textContent = STORE_CONFIG.address);
  document.querySelectorAll(".store-hours").forEach(el => el.textContent = STORE_CONFIG.status.openingHoursText);
  document.querySelectorAll(".store-pix-key").forEach(el => el.textContent = STORE_CONFIG.pixKey);
  document.querySelectorAll(".store-pix-beneficiary").forEach(el => el.textContent = STORE_CONFIG.pixBeneficiary);
}

// --- RENDERIZAÇÃO DAS PÍLULAS DE CATEGORIA ---
function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button type="button" class="category-pill ${cat.id === currentCategory ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
      <span class="cat-icon">${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join("");
}

function selectCategory(catId) {
  currentCategory = catId;
  renderCategoryPills();
  renderCatalog();

  const catalogEl = document.getElementById("catalog-section");
  if (catalogEl) {
    const yOffset = -70;
    const y = catalogEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// --- RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS ---
function renderCatalog() {
  const catalogContainer = document.getElementById("catalog-products-container");
  if (!catalogContainer || typeof PRODUCTS === "undefined") return;

  let filtered = PRODUCTS.filter(product => {
    const matchesCat = currentCategory === "todos" || product.category === currentCategory;
    const matchesSearch = currentSearchTerm === "" ||
      product.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    catalogContainer.innerHTML = `
      <div class="empty-cart-view" style="grid-column: 1 / -1; margin: 2rem 0;">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente buscar por outro termo ou escolha uma categoria diferente acima.</p>
        <button class="btn btn-outline-dark" onclick="clearSearchAndFilters()" style="margin-top: 0.5rem;">
          Ver todos os produtos
        </button>
      </div>
    `;
    return;
  }

  if (currentCategory === "todos" && currentSearchTerm === "") {
    const categoryShelves = CATEGORIES.filter(c => c.id !== "todos");

    catalogContainer.innerHTML = categoryShelves.map(shelf => {
      const shelfProducts = PRODUCTS.filter(p => p.category === shelf.id);
      if (shelfProducts.length === 0) return "";

      return `
        <div class="shelf-section" id="shelf-${shelf.id}">
          <div class="shelf-header">
            <div class="shelf-title-wrap">
              <span>${shelf.icon}</span>
              <h3>${shelf.name}</h3>
              <span class="shelf-tag">${shelfProducts.length} itens</span>
            </div>
            <button type="button" class="btn-link" onclick="selectCategory('${shelf.id}')" style="font-size:0.82rem; font-weight:700; color:var(--color-red); cursor:pointer;">
              Ver todos →
            </button>
          </div>
          <div class="products-grid">
            ${shelfProducts.map(product => renderProductCardHTML(product)).join("")}
          </div>
        </div>
      `;
    }).join("");
  } else {
    catalogContainer.innerHTML = `
      <div class="products-grid">
        ${filtered.map(product => renderProductCardHTML(product)).join("")}
      </div>
    `;
  }
}

function renderProductCardHTML(product) {
  const inCartItem = (typeof cart !== "undefined" && cart.items) ? cart.items.find(i => i.id === product.id) : null;
  const qtyInCart = inCartItem ? inCartItem.qty : 0;

  const actionButtonHTML = qtyInCart > 0 ? `
    <div class="card-qty-control">
      <button type="button" class="card-qty-btn" onclick="cart.updateQuantity('${product.id}', ${qtyInCart - 1})" aria-label="Diminuir quantidade">-</button>
      <span class="card-qty-num">${qtyInCart}</span>
      <button type="button" class="card-qty-btn" onclick="cart.updateQuantity('${product.id}', ${qtyInCart + 1})" aria-label="Aumentar quantidade">+</button>
    </div>
  ` : `
    <button type="button" class="btn-add-cart" onclick="cart.addItem('${product.id}')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
      <span>Adicionar</span>
    </button>
  `;

  return `
    <div class="product-card" data-id="${product.id}">
      ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80'">
      </div>
      <div class="product-info">
        <h4 class="product-title" title="${product.name}">${product.name}</h4>
        <span class="product-volume">${product.volume}</span>
        <p class="product-desc">${product.description}</p>
        <div class="product-pricing">
          ${product.originalPrice ? `<span class="price-original">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
          <span class="price-current">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
        </div>
        ${actionButtonHTML}
      </div>
    </div>
  `;
}

function initSearchAndFilters() {
  const searchInput = document.getElementById("search-products");
  const clearBtn = document.getElementById("search-clear-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value.trim();
      if (clearBtn) {
        clearBtn.classList.toggle("visible", currentSearchTerm.length > 0);
      }
      renderCatalog();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        currentSearchTerm = "";
        clearBtn.classList.remove("visible");
        renderCatalog();
        searchInput.focus();
      }
    });
  }
}

function clearSearchAndFilters() {
  const searchInput = document.getElementById("search-products");
  if (searchInput) searchInput.value = "";
  currentSearchTerm = "";
  currentCategory = "todos";
  renderCategoryPills();
  renderCatalog();
}

function scrollToCatalog() {
  const catalogEl = document.getElementById("catalog-section");
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}
