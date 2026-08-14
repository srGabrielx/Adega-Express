/**
 * Lógica da Interface Principal - Adega Express 15 Min
 * Renderização em Fileiras (Vitrines por Categoria), Busca em Tempo Real e Interatividade
 */

let currentCategory = "todos";
let currentSearchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
  // SPLASH SCREEN LOGIC
  const splash = document.getElementById("splash-screen");
  if (splash) {
    setTimeout(() => {
      splash.classList.add("hidden");
      document.body.style.overflow = "auto";
      setTimeout(() => {
        splash.remove();
        document.body.style.overflow = "auto";
      }, 500);
    }, 1200);
  } else {
    document.body.style.overflow = "auto";
  }

  initAgeGate();
  initStoreInfo();
  renderCategoryPills();
  renderCatalog();
  initSearchAndFilters();
  initDeliveryFeeCalculator();
  initFaqAccordion();
  initHeaderScroll();
});

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
      document.body.style.overflow = "auto";
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

// --- PREENCHIMENTO DE DADOS DINÂMICOS DA LOJA ---
function initStoreInfo() {
  document.querySelectorAll(".store-name").forEach(el => el.textContent = STORE_CONFIG.name);
  document.querySelectorAll(".store-tagline").forEach(el => el.textContent = STORE_CONFIG.tagline);
  document.querySelectorAll(".store-phone-formatted").forEach(el => el.textContent = STORE_CONFIG.phoneFormatted);
  document.querySelectorAll(".store-address").forEach(el => el.textContent = STORE_CONFIG.address);
  document.querySelectorAll(".store-hours").forEach(el => el.textContent = STORE_CONFIG.status.openingHoursText);
  document.querySelectorAll(".store-pix-key").forEach(el => el.textContent = STORE_CONFIG.pixKey);
  document.querySelectorAll(".store-pix-beneficiary").forEach(el => el.textContent = STORE_CONFIG.pixBeneficiary);
  
  const statusBadge = document.getElementById("store-status-badge");
  if (statusBadge) {
    statusBadge.innerHTML = `<span class="pulse-dot"></span> ${STORE_CONFIG.status.currentBadge}`;
  }

  const directWaLinks = document.querySelectorAll(".btn-direct-whatsapp");
  directWaLinks.forEach(link => {
    link.href = `https://api.whatsapp.com/send?phone=${STORE_CONFIG.phone}&text=${encodeURIComponent("Olá! Gostaria de pedir uma bebida com entrega rápida em 15 minutos.")}`;
  });
}

// --- RENDERIZAÇÃO DAS CATEGORIAS (PÍLULAS) ---
function renderCategoryPills() {
  const container = document.getElementById("category-pills-container");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-pill ${cat.id === currentCategory ? 'active' : ''}" data-cat="${cat.id}">
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-label">${cat.name}</span>
    </button>
  `).join("");

  container.querySelectorAll(".category-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".category-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.cat;
      
      const searchInput = document.getElementById("search-input");
      if (searchInput && searchInput.value) {
        searchInput.value = "";
        currentSearchTerm = "";
        const clearBtn = document.getElementById("clear-search-btn");
        if (clearBtn) clearBtn.style.display = "none";
      }

      renderCatalog();
    });
  });
}

// --- RENDERIZAÇÃO DO CATÁLOGO (FILEIRAS POR CATEGORIA OU GRID FILTRADA) ---
function renderCatalog() {
  const catalogContainer = document.getElementById("catalog-shelves-container");
  const countLabel = document.getElementById("products-count-label");
  if (!catalogContainer) return;

  // CASO 1: Termo de busca ativo ou categoria individual selecionada (Exibe Grid de Produtos)
  if (currentSearchTerm || currentCategory !== "todos") {
    let filteredList = PRODUCTS;

    if (currentCategory !== "todos") {
      filteredList = filteredList.filter(p => p.category === currentCategory);
    }

    if (currentSearchTerm) {
      const term = currentSearchTerm.toLowerCase();
      filteredList = filteredList.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        (p.badge && p.badge.toLowerCase().includes(term))
      );
    }

    if (countLabel) {
      countLabel.textContent = `${filteredList.length} ${filteredList.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
    }

    if (filteredList.length === 0) {
      catalogContainer.innerHTML = `
        <div class="no-products-found" style="text-align:center; padding:3rem 1rem; background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md);">
          <div style="font-size:3rem; margin-bottom:0.75rem;">🔍</div>
          <h3 style="font-size:1.3rem; margin-bottom:0.4rem;">Nenhum produto encontrado</h3>
          <p style="color:var(--color-gray); font-size:0.9rem; margin-bottom:1.25rem;">Não encontramos itens para o filtro selecionado.</p>
          <button class="btn btn-primary-red" onclick="resetFilters()">Ver todos os produtos</button>
        </div>
      `;
      return;
    }

    catalogContainer.innerHTML = `
      <div class="products-grid-filtered">
        ${filteredList.map(prod => createProductCardHTML(prod)).join("")}
      </div>
    `;
    return;
  }

  // CASO 2: "Todos os Produtos" (Exibe Fileiras/Vitrines Horizontais por Categoria)
  if (countLabel) {
    countLabel.innerHTML = `⚡ <strong>${PRODUCTS.length} opções</strong> prontas para entrega em 15 min`;
  }

  const categoryShelves = [
    { id: "combos", title: "Combos & Kits da Noite", icon: "🔥", tag: "Campeões de Venda" },
    { id: "cervejas", title: "Cervejas Geladas", icon: "🍺", tag: "Trincando a -2°C" },
    { id: "destilados", title: "Whiskies & Destilados", icon: "🥃", tag: "100% Originais" },
    { id: "vinhos", title: "Vinhos & Espumantes", icon: "🍷", tag: "Prontos p/ Servir" },
    { id: "nao-alcoolicos", title: "Energéticos & Refris", icon: "🥤", tag: "Super Gelados" },
    { id: "conveniencia", title: "Gelo, Carvão & Petiscos", icon: "🧊", tag: "Essenciais" }
  ];

  catalogContainer.innerHTML = categoryShelves.map(shelf => {
    const shelfProducts = PRODUCTS.filter(p => p.category === shelf.id);
    if (shelfProducts.length === 0) return "";

    return `
      <section class="category-shelf-section" id="shelf-${shelf.id}">
        <div class="shelf-header">
          <div class="shelf-title-wrap">
            <span class="shelf-icon">${shelf.icon}</span>
            <h3>${shelf.title}</h3>
            <span class="shelf-tag">${shelf.tag}</span>
          </div>
          <div class="shelf-nav-actions">
            <button class="btn-shelf-scroll" onclick="scrollShelf('row-${shelf.id}', -300)" title="Voltar">‹</button>
            <button class="btn-shelf-scroll" onclick="scrollShelf('row-${shelf.id}', 300)" title="Avançar">›</button>
          </div>
        </div>

        <div class="products-row" id="row-${shelf.id}">
          ${shelfProducts.map(prod => createProductCardHTML(prod)).join("")}
        </div>
      </section>
    `;
  }).join("");
}

// --- GERAÇÃO DO HTML DO CARD DE PRODUTO ---
function createProductCardHTML(prod) {
  const cartItem = cart.items.find(i => i.id === prod.id);

  const actionButtonHTML = cartItem ? `
    <div class="card-counter-wrap">
      <button class="card-counter-btn" onclick="cart.updateQuantity('${prod.id}', ${cartItem.qty - 1})">-</button>
      <span class="card-counter-num">${cartItem.qty}</span>
      <button class="card-counter-btn" onclick="cart.updateQuantity('${prod.id}', ${cartItem.qty + 1})">+</button>
    </div>
  ` : `
    <button class="btn-add-cart" onclick="cart.addItem('${prod.id}')" title="Adicionar ao Pedido">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      <span>Pedir</span>
    </button>
  `;

  return `
    <article class="product-card" data-id="${prod.id}">
      <div class="product-image-wrap">
        <img 
          src="${prod.image}" 
          alt="${prod.name}" 
          class="product-image" 
          loading="lazy" 
          onerror="this.src='https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'"
        />
        ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
        ${prod.originalPrice ? `<span class="discount-pill">OFERTA</span>` : ''}
      </div>

      <div class="product-body">
        <div class="product-header">
          <span class="product-volume">⚡ ${prod.volume}</span>
          <h4 class="product-title">${prod.name}</h4>
          <p class="product-desc">${prod.description}</p>
        </div>

        <div class="product-footer">
          <div class="product-pricing">
            ${prod.originalPrice ? `<span class="price-original">R$ ${prod.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
            <span class="price-current">R$ ${prod.price.toFixed(2).replace('.', ',')}</span>
          </div>

          <div class="card-action-box" id="card-action-${prod.id}">
            ${actionButtonHTML}
          </div>
        </div>
      </div>
    </article>
  `;
}

// --- ROLAGEM HORIZONTAL DAS FILEIRAS ---
function scrollShelf(rowId, offset) {
  const row = document.getElementById(rowId);
  if (row) {
    row.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

// --- RESET DE FILTROS ---
function resetFilters() {
  currentCategory = "todos";
  currentSearchTerm = "";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  
  const container = document.getElementById("category-pills-container");
  if (container) {
    container.querySelectorAll(".category-pill").forEach(b => {
      b.classList.toggle("active", b.dataset.cat === "todos");
    });
  }
  renderCatalog();
}

// --- BUSCA EM TEMPO REAL ---
function initSearchAndFilters() {
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value.trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearchTerm ? "flex" : "none";
      }
      renderCatalog();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        currentSearchTerm = "";
        clearSearchBtn.style.display = "none";
        renderCatalog();
      }
    });
  }
}

// --- CALCULADORA DE BAIRROS E TAXAS ---
function initDeliveryFeeCalculator() {
  const grid = document.getElementById("neighborhoods-grid");
  if (!grid) return;

  grid.innerHTML = STORE_CONFIG.neighborhoods.map(n => `
    <div class="neighborhood-card">
      <div class="neighborhood-header">
        <span>📍</span>
        <span class="neighborhood-name">${n.name}</span>
      </div>
      <div class="neighborhood-details">
        <span class="detail-pill">Taxa: <strong>R$ ${n.fee.toFixed(2).replace('.', ',')}</strong></span>
        <span class="detail-pill time">⚡ ${n.time}</span>
      </div>
    </div>
  `).join("");
}

// --- FAQ ACCORDION ---
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isOpen) {
          item.classList.add("active");
        }
      });
    }
  });
}

// --- HEADER SCROLL ---
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });
}

function scrollToCatalog() {
  const catalog = document.getElementById("catalogo");
  if (catalog) {
    catalog.scrollIntoView({ behavior: "smooth" });
  }
}
