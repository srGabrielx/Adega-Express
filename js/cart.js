/**
 * Gerenciador de Carrinho & Motor de Checkout Seguro - Adega Express 15 Min
 */

class CartManager {
  constructor() {
    this.storageKey = "adega_cart_v2";
    this.historyKey = "adega_order_history";
    this.items = this.loadCart();
    this.selectedPayment = "pix";
    this.selectedNeighborhood = "";
    this.init();
  }

  init() {
    this.updateCartBadges();
    if (document.getElementById("checkout-items-list") || document.getElementById("cart-items-list")) {
      this.renderCheckoutUI();
      this.initFormListeners();
    }
  }

  // Carrega e valida os itens com o catálogo canônico de PRODUCTS
  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];

      // Validar cada item contra o catálogo canônico
      return parsed
        .map(item => {
          const canonical = typeof PRODUCTS !== "undefined" ? PRODUCTS.find(p => p.id === item.id) : null;
          if (!canonical) return null;
          return {
            id: canonical.id,
            name: canonical.name,
            volume: canonical.volume,
            price: Number(canonical.price), // Preço oficial inalterável
            image: canonical.image,
            qty: Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1))
          };
        })
        .filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateCartBadges();
    if (typeof renderCatalog === "function") {
      renderCatalog(); // Atualiza os botões nos cards de produtos
    }
  }

  // Adicionar produto ao carrinho
  addItem(productId) {
    const canonical = typeof PRODUCTS !== "undefined" ? PRODUCTS.find(p => p.id === productId) : null;
    if (!canonical) return;

    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({
        id: canonical.id,
        name: canonical.name,
        volume: canonical.volume,
        price: Number(canonical.price),
        image: canonical.image,
        qty: 1
      });
    }

    this.saveCart();
    this.triggerBadgeBump();
    this.showToast(`✅ ${canonical.name} adicionado ao pedido!`, "success");

    if (document.getElementById("checkout-items-list") || document.getElementById("cart-items-list")) {
      this.renderCheckoutUI();
    }
  }

  // Atualizar quantidade de um item
  updateQuantity(productId, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.qty = Math.min(99, qty);
      this.saveCart();
      if (document.getElementById("checkout-items-list") || document.getElementById("cart-items-list")) {
        this.renderCheckoutUI();
      }
    }
  }

  // Remover item do carrinho
  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveCart();
    this.showToast("Item removido do pedido", "info");
    if (document.getElementById("checkout-items-list") || document.getElementById("cart-items-list")) {
      this.renderCheckoutUI();
    }
  }

  // Quantidade total de itens
  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  // Subtotal calculado estritamente
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  // Taxa de entrega calculada pelo bairro selecionado
  getDeliveryFee() {
    if (!this.selectedNeighborhood || typeof STORE_CONFIG === "undefined") return 0;
    const found = STORE_CONFIG.neighborhoods.find(n => n.name === this.selectedNeighborhood);
    return found ? found.fee : 0;
  }

  // Total final garantido
  getGrandTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  // Atualiza badges do carrinho no topo
  updateCartBadges() {
    const count = this.getTotalCount();
    document.querySelectorAll(".cart-count-badge").forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-block" : "none";
    });
  }

  triggerBadgeBump() {
    document.querySelectorAll(".btn-nav-cart").forEach(btn => {
      btn.classList.add("badge-bump");
      setTimeout(() => btn.classList.remove("badge-bump"), 300);
    });
  }

  // Navegar para o checkout
  goToCheckout() {
    window.location.href = "checkout.html";
  }

  // Renderiza a interface do Checkout
  renderCheckoutUI() {
    const listContainer = document.getElementById("checkout-items-list") || document.getElementById("cart-items-list");
    const emptyView = document.getElementById("cart-empty-view") || document.getElementById("cart-empty-state");
    const formSection = document.getElementById("checkout-form-section") || document.getElementById("cart-checkout-form");
    const summaryCard = document.getElementById("checkout-summary-card") || document.getElementById("cart-footer-section");

    const subtotalEl = document.getElementById("summary-subtotal") || document.getElementById("cart-subtotal");
    const deliveryFeeEl = document.getElementById("summary-delivery-fee") || document.getElementById("cart-delivery-fee");
    const grandTotalEl = document.getElementById("summary-grand-total") || document.getElementById("cart-total");

    if (!listContainer) return;

    // Se carrinho estiver vazio
    if (this.items.length === 0) {
      listContainer.innerHTML = "";
      if (emptyView) emptyView.style.display = "block";
      if (formSection) formSection.style.display = "none";
      if (summaryCard) summaryCard.style.display = "none";
      return;
    }

    if (emptyView) emptyView.style.display = "none";
    if (formSection) formSection.style.display = "block";
    if (summaryCard) summaryCard.style.display = "block";

    // Renderizar lista de itens
    listContainer.innerHTML = this.items.map(item => `
      <div class="checkout-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="checkout-item-thumb" onerror="this.src='https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=150&q=80'">
        <div class="checkout-item-details">
          <h4 class="checkout-item-title">${item.name}</h4>
          <span class="checkout-item-vol">${item.volume}</span>
          <div class="checkout-item-unit-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        </div>
        <div class="checkout-item-actions">
          <div class="checkout-qty-selector">
            <button type="button" class="btn-item-qty" onclick="cart.updateQuantity('${item.id}', ${item.qty - 1})" aria-label="Diminuir quantidade">-</button>
            <span class="item-qty-val">${item.qty}</span>
            <button type="button" class="btn-item-qty" onclick="cart.updateQuantity('${item.id}', ${item.qty + 1})" aria-label="Aumentar quantidade">+</button>
          </div>
          <button type="button" class="btn-remove-item" onclick="cart.removeItem('${item.id}')" title="Remover item" aria-label="Remover">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `).join("");

    // Atualizar Valores
    const subtotal = this.getSubtotal();
    const fee = this.getDeliveryFee();
    const grandTotal = this.getGrandTotal();

    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (deliveryFeeEl) {
      deliveryFeeEl.textContent = this.selectedNeighborhood
        ? `R$ ${fee.toFixed(2).replace('.', ',')}`
        : "Selecione o bairro";
    }
    if (grandTotalEl) grandTotalEl.textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;

    this.validateCheckoutForm();
  }

  // Inicializa escutadores de formulário e máscaras
  initFormListeners() {
    const neighborhoodSelect = document.getElementById("checkout-neighborhood");
    if (neighborhoodSelect && typeof STORE_CONFIG !== "undefined") {
      neighborhoodSelect.innerHTML = '<option value="">-- Selecione seu Bairro em Marabá --</option>' +
        STORE_CONFIG.neighborhoods.map(n => `<option value="${n.name}">${n.name} (+ R$ ${n.fee.toFixed(2).replace('.', ',')})</option>`).join("");

      neighborhoodSelect.addEventListener("change", (e) => {
        this.selectedNeighborhood = e.target.value;
        this.renderCheckoutUI();
      });
    }

    // Máscara de Telefone Celular: (XX) XXXXX-XXXX
    const phoneInput = document.getElementById("checkout-phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 11) val = val.slice(0, 11);

        if (val.length > 6) {
          val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
        } else if (val.length > 2) {
          val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
        } else if (val.length > 0) {
          val = `(${val}`;
        }
        e.target.value = val;
        this.validateCheckoutForm();
      });
    }

    // Validação em tempo real para campos obrigatórios
    ["checkout-name", "checkout-street", "checkout-number"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.validateCheckoutForm());
        el.addEventListener("blur", () => this.validateField(el));
      }
    });

    // Opções de Pagamento
    document.querySelectorAll("input[name='payment_method']").forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.selectedPayment = e.target.value;
        document.querySelectorAll(".payment-card-opt").forEach(card => card.classList.remove("selected"));
        const parentCard = e.target.closest(".payment-card-opt");
        if (parentCard) parentCard.classList.add("selected");

        const pixBox = document.getElementById("pix-info-group");
        const changeBox = document.getElementById("change-input-group");
        if (pixBox) pixBox.style.display = this.selectedPayment === "pix" ? "block" : "none";
        if (changeBox) changeBox.style.display = this.selectedPayment === "dinheiro" ? "block" : "none";
      });
    });
  }

  validateField(el) {
    if (!el) return true;
    const val = el.value.trim();
    let isValid = true;

    if (el.id === "checkout-name") isValid = val.length >= 3;
    if (el.id === "checkout-phone") isValid = val.replace(/\D/g, "").length >= 10;
    if (el.id === "checkout-street") isValid = val.length >= 3;
    if (el.id === "checkout-number") isValid = val.length >= 1;
    if (el.id === "checkout-neighborhood") isValid = val !== "";

    if (isValid) {
      el.classList.remove("is-invalid");
      el.classList.add("is-valid");
    } else if (val.length > 0) {
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");
    }
    return isValid;
  }

  // Validação geral para habilitar/desabilitar o botão de finalizar
  validateCheckoutForm() {
    const name = document.getElementById("checkout-name")?.value.trim() || "";
    const phone = document.getElementById("checkout-phone")?.value.replace(/\D/g, "") || "";
    const neighborhood = this.selectedNeighborhood;
    const street = document.getElementById("checkout-street")?.value.trim() || "";
    const number = document.getElementById("checkout-number")?.value.trim() || "";

    const isNameValid = name.length >= 3;
    const isPhoneValid = phone.length >= 10;
    const isNeighborhoodValid = neighborhood !== "";
    const isStreetValid = street.length >= 3;
    const isNumberValid = number.length >= 1;
    const hasItems = this.items.length > 0;
    const meetsMin = this.getSubtotal() >= (typeof STORE_CONFIG !== "undefined" ? STORE_CONFIG.minOrderValue : 20);

    const isFormValid = isNameValid && isPhoneValid && isNeighborhoodValid && isStreetValid && isNumberValid && hasItems && meetsMin;

    const submitBtn = document.getElementById("btn-submit-order") || document.querySelector(".btn-submit-checkout");
    if (submitBtn) {
      submitBtn.disabled = !isFormValid;
      if (!isFormValid) {
        if (!hasItems) submitBtn.title = "Adicione produtos para finalizar";
        else if (!meetsMin) submitBtn.title = `Pedido mínimo é R$ ${STORE_CONFIG.minOrderValue.toFixed(2)}`;
        else submitBtn.title = "Preencha todos os campos obrigatórios";
      } else {
        submitBtn.title = "Clique para confirmar seu pedido express";
      }
    }

    return isFormValid;
  }

  // Submissão Segura do Pedido
  submitOrder() {
    if (!this.validateCheckoutForm()) {
      // Focar no primeiro campo inválido
      const fields = [
        { id: "checkout-name", valid: (document.getElementById("checkout-name")?.value.trim() || "").length >= 3 },
        { id: "checkout-phone", valid: (document.getElementById("checkout-phone")?.value.replace(/\D/g, "") || "").length >= 10 },
        { id: "checkout-neighborhood", valid: this.selectedNeighborhood !== "" },
        { id: "checkout-street", valid: (document.getElementById("checkout-street")?.value.trim() || "").length >= 3 },
        { id: "checkout-number", valid: (document.getElementById("checkout-number")?.value.trim() || "").length >= 1 }
      ];
      const firstInvalid = fields.find(f => !f.valid);
      if (firstInvalid) {
        const el = document.getElementById(firstInvalid.id);
        if (el) {
          el.classList.add("is-invalid");
          el.focus();
        }
      }
      this.showToast("Por favor, preencha todos os campos obrigatórios marcados com *", "warning");
      return;
    }

    const name = document.getElementById("checkout-name")?.value.trim();
    const phone = document.getElementById("checkout-phone")?.value.trim();
    const street = document.getElementById("checkout-street")?.value.trim();
    const number = document.getElementById("checkout-number")?.value.trim();
    const complement = document.getElementById("checkout-complement")?.value.trim() || "";
    const reference = document.getElementById("checkout-reference")?.value.trim() || "";
    const notes = document.getElementById("checkout-notes")?.value.trim() || "";

    const orderId = '#' + Math.floor(1000 + Math.random() * 9000);
    const subtotal = this.getSubtotal();
    const deliveryFee = this.getDeliveryFee();
    const total = this.getGrandTotal();

    // Salvar pedido no histórico local
    const orderRecord = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...this.items],
      subtotal,
      deliveryFee,
      total,
      customer: { name, phone, address: `${street}, Nº ${number} - ${this.selectedNeighborhood} ${complement ? `(${complement})` : ''}` },
      paymentMethod: this.selectedPayment,
      notes,
      status: "Em Preparação"
    };

    const history = JSON.parse(localStorage.getItem(this.historyKey) || "[]");
    history.push(orderRecord);
    localStorage.setItem(this.historyKey, JSON.stringify(history));

    // Limpar o carrinho
    this.items = [];
    this.saveCart();

    this.showToast("🚀 Pedido confirmado com sucesso! Redirecionando...", "success");

    setTimeout(() => {
      window.location.href = `order-success.html?id=${orderId.replace('#', '')}`;
    }, 400);
  }

  // Copiar Chave Pix
  copyPixKey() {
    const key = (typeof STORE_CONFIG !== "undefined" && STORE_CONFIG.pixKey) ? STORE_CONFIG.pixKey : "11964589578";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key).then(() => {
        this.showToast("✅ Chave Pix copiada com sucesso!", "success");
      }).catch(() => {
        this.fallbackCopy(key);
      });
    } else {
      this.fallbackCopy(key);
    }
  }

  fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      this.showToast("✅ Chave Pix copiada!", "success");
    } catch (e) {
      prompt("Copie a chave Pix:", text);
    }
    document.body.removeChild(ta);
  }

  // Notificação Toast
  showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button style="color:#fff; opacity:0.7; font-size:1.1rem; cursor:pointer;" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 0.2s ease";
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }
}

const cart = new CartManager();
