/**
 * Gerenciador do Carrinho & Checkout Express 15 Min via WhatsApp
 */
class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.selectedNeighborhood = null;
    this.selectedPayment = "pix";
    this.customerInfo = {
      name: "",
      phone: "",
      street: "",
      number: "",
      complement: "",
      reference: "",
      changeFor: "",
      notes: ""
    };
    this.initEventListeners();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem("adega_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("adega_cart", JSON.stringify(this.items));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
    this.updateCartBadges();
  }

  addItem(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        volume: product.volume,
        image: product.image,
        qty: qty
      });
    }

    this.saveCart();
    this.renderCartUI();
    this.syncProductCards();
    this.showToast(`⚡ <strong>${product.name}</strong> adicionado!`, "success");
    this.triggerCartBounce();
  }

  updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.qty = newQty;
      this.saveCart();
      this.renderCartUI();
      this.syncProductCards();
    }
  }

  removeItem(productId) {
    const item = this.items.find(i => i.id === productId);
    const itemName = item ? item.name : "Item";
    this.items = this.items.filter(i => i.id !== productId);
    this.saveCart();
    this.renderCartUI();
    this.syncProductCards();
    this.showToast(`🗑️ ${itemName} removido do pedido.`, "info");
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.renderCartUI();
    this.syncProductCards();
  }

  syncProductCards() {
    // Atualiza botões nos cards de produtos sem re-renderizar a página toda
    PRODUCTS.forEach(prod => {
      const actionBoxes = document.querySelectorAll(`#card-action-${prod.id}`);
      const cartItem = this.items.find(i => i.id === prod.id);

      actionBoxes.forEach(box => {
        if (cartItem) {
          box.innerHTML = `
            <div class="card-counter-wrap">
              <button class="card-counter-btn" onclick="cart.updateQuantity('${prod.id}', ${cartItem.qty - 1})">-</button>
              <span class="card-counter-num">${cartItem.qty}</span>
              <button class="card-counter-btn" onclick="cart.updateQuantity('${prod.id}', ${cartItem.qty + 1})">+</button>
            </div>
          `;
        } else {
          box.innerHTML = `
            <button class="btn-add-cart" onclick="cart.addItem('${prod.id}')" title="Adicionar ao Pedido">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Pedir</span>
            </button>
          `;
        }
      });
    });
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  getDeliveryFee() {
    if (!this.selectedNeighborhood) return 0;
    const found = STORE_CONFIG.neighborhoods.find(n => n.name === this.selectedNeighborhood);
    return found ? found.fee : 0;
  }

  getTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  getTotalItemsCount() {
    return this.items.reduce((total, item) => total + item.qty, 0);
  }

  updateCartBadges() {
    const count = this.getTotalItemsCount();
    const subtotal = this.getSubtotal();
    
    const countBadges = document.querySelectorAll(".cart-count-badge");
    countBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });

    const floatingButton = document.getElementById("floating-cart-btn");
    const floatingTotal = document.getElementById("floating-cart-total");
    if (floatingButton) {
      if (count > 0) {
        floatingButton.classList.add("visible");
        if (floatingTotal) floatingTotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
      } else {
        floatingButton.classList.remove("visible");
      }
    }
  }

  triggerCartBounce() {
    const btn = document.getElementById("floating-cart-btn");
    const navBtn = document.getElementById("nav-cart-btn");
    [btn, navBtn].forEach(el => {
      if (el) {
        el.classList.add("bounce-anim");
        setTimeout(() => el.classList.remove("bounce-anim"), 600);
      }
    });
  }

  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  renderCartUI() {
    const cartList = document.getElementById("cart-items-list");
    const emptyState = document.getElementById("cart-empty-state");
    const cartFooter = document.getElementById("cart-footer-section");
    const checkoutForm = document.getElementById("cart-checkout-form");
    const subtotalEl = document.getElementById("cart-subtotal");
    const deliveryFeeEl = document.getElementById("cart-delivery-fee");
    const totalEl = document.getElementById("cart-total");
    const minOrderAlert = document.getElementById("min-order-alert");

    if (!cartList) return;

    if (this.items.length === 0) {
      cartList.innerHTML = "";
      if (emptyState) emptyState.style.display = "flex";
      if (cartFooter) cartFooter.style.display = "none";
      if (checkoutForm) checkoutForm.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (cartFooter) cartFooter.style.display = "block";
    if (checkoutForm) checkoutForm.style.display = "block";
    cartList.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=150&q=80'">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-volume">${item.volume}</span>
          <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-counter">
            <button class="btn-qty" onclick="cart.updateQuantity('${item.id}', ${item.qty - 1})">-</button>
            <span class="qty-num">${item.qty}</span>
            <button class="btn-qty" onclick="cart.updateQuantity('${item.id}', ${item.qty + 1})">+</button>
          </div>
          <button class="btn-remove" onclick="cart.removeItem('${item.id}')" title="Remover item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `).join("");

    const subtotal = this.getSubtotal();
    const deliveryFee = this.getDeliveryFee();
    const grandTotal = subtotal + deliveryFee;

    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (deliveryFeeEl) {
      if (this.selectedNeighborhood) {
        deliveryFeeEl.textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
      } else {
        deliveryFeeEl.textContent = "Selecione o bairro";
      }
    }
    if (totalEl) totalEl.textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;

    if (minOrderAlert) {
      if (subtotal < STORE_CONFIG.minOrderValue) {
        const diff = (STORE_CONFIG.minOrderValue - subtotal).toFixed(2).replace('.', ',');
        minOrderAlert.style.display = "block";
        minOrderAlert.innerHTML = `⚠️ Pedido mínimo: <strong>R$ ${STORE_CONFIG.minOrderValue.toFixed(2).replace('.', ',')}</strong>. Faltam <strong>R$ ${diff}</strong>.`;
      } else {
        minOrderAlert.style.display = "none";
      }
    }
  }

  initEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      const selectNeighborhood = document.getElementById("checkout-neighborhood");
      if (selectNeighborhood) {
        selectNeighborhood.innerHTML = '<option value="">-- Selecione seu Bairro --</option>' + 
          STORE_CONFIG.neighborhoods.map(n => `
            <option value="${n.name}">
              ${n.name} (Taxa: R$ ${n.fee.toFixed(2).replace('.', ',')} • ${n.time})
            </option>
          `).join("");

        selectNeighborhood.addEventListener("change", (e) => {
          this.selectedNeighborhood = e.target.value;
          this.renderCartUI();
        });
      }

      const paymentOptions = document.querySelectorAll("input[name='payment_method']");
      paymentOptions.forEach(input => {
        input.addEventListener("change", (e) => {
          this.selectedPayment = e.target.value;
          const changeBox = document.getElementById("change-input-group");
          const pixBox = document.getElementById("pix-info-group");
          
          if (changeBox) changeBox.style.display = this.selectedPayment === "dinheiro" ? "block" : "none";
          if (pixBox) pixBox.style.display = this.selectedPayment === "pix" ? "flex" : "none";
        });
      });

      this.updateCartBadges();
      this.renderCartUI();
    });
  }

  goToCheckout() {
    window.location.href = "checkout.html";
  }

  openCart() {
    window.location.href = "checkout.html";
  }

  closeCart() {
    window.location.href = "index.html";
  }

  sendWhatsAppOrder() {
    if (this.items.length === 0) {
      this.showToast("Adicione produtos ao carrinho antes de finalizar!", "warning");
      return;
    }

    const subtotal = this.getSubtotal();
    if (subtotal < STORE_CONFIG.minOrderValue) {
      this.showToast(`O valor mínimo para entrega é R$ ${STORE_CONFIG.minOrderValue.toFixed(2).replace('.', ',')}`, "warning");
      return;
    }

    const name = document.getElementById("checkout-name")?.value.trim();
    const phone = document.getElementById("checkout-phone")?.value.trim();
    const neighborhood = document.getElementById("checkout-neighborhood")?.value;
    const street = document.getElementById("checkout-street")?.value.trim();
    const number = document.getElementById("checkout-number")?.value.trim();
    const complement = document.getElementById("checkout-complement")?.value.trim() || "Sem complemento";
    const reference = document.getElementById("checkout-reference")?.value.trim() || "";
    const notes = document.getElementById("checkout-notes")?.value.trim() || "";
    const changeFor = document.getElementById("checkout-change")?.value.trim() || "";

    if (!name) {
      this.showToast("Por favor, preencha o seu Nome.", "warning");
      document.getElementById("checkout-name")?.focus();
      return;
    }

    if (!neighborhood) {
      this.showToast("Por favor, selecione o seu Bairro de entrega.", "warning");
      document.getElementById("checkout-neighborhood")?.focus();
      return;
    }

    if (!street || !number) {
      this.showToast("Por favor, preencha a Rua e o Número.", "warning");
      document.getElementById("checkout-street")?.focus();
      return;
    }

    const deliveryFee = this.getDeliveryFee();
    const grandTotal = subtotal + deliveryFee;

        // Salvar no histórico
    const orderHistory = JSON.parse(localStorage.getItem("adega_order_history") || "[]");
    const orderId = '#' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: this.items,
      total: grandTotal,
      status: "Preparando"
    };
    orderHistory.push(newOrder);
    localStorage.setItem("adega_order_history", JSON.stringify(orderHistory));

    // Finalizar no site: limpa o carrinho e envia para a tela de sucesso
    this.items = [];
    this.saveCart();
    
    // Mostra um toast por garantia, e logo em seguida redireciona
    this.showToast("🚀 Pedido recebido! Redirecionando...", "success");
    
    setTimeout(() => {
      window.location.href = `order-success.html?id=${orderId.replace('#', '')}`;
    }, 600);
  }

  copyPixKey() {
    const key = STORE_CONFIG.pixKey;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key).then(() => {
        this.showToast(`✅ Chave Pix copiada com sucesso!`, "success");
      }).catch(() => {
        this.fallbackCopyText(key);
      });
    } else {
      this.fallbackCopyText(key);
    }
  }

  fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(`✅ Chave Pix copiada: ${text}`, "success");
    } catch (err) {
      prompt("Copie a chave Pix abaixo:", text);
    }
    document.body.removeChild(textArea);
  }
}

const cart = new CartManager();
