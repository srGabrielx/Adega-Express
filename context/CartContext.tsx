"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Order, CustomerInfo } from "@/types";
import { PRODUCTS } from "@/data/products";
import { STORE_CONFIG } from "@/data/config";

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (name: string) => void;
  getDeliveryFee: () => number;
  getGrandTotal: () => number;
  orders: Order[];
  saveOrder: (customer: CustomerInfo, paymentMethod: "pix" | "cartao_maquininha" | "dinheiro", changeFor?: string, notes?: string) => Order;
  updateOrderStatus: (orderId: string, newStatus: Order["status"]) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: number) => void;
  isAgeVerified: boolean;
  confirmAge: () => void;
  badgeBumping: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "adega_cart_next_v1";
const ORDERS_STORAGE_KEY = "adega_order_history_v1";
const AGE_STORAGE_KEY = "adega_age_verified";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(true); // Default true during SSR, verified in effect
  const [badgeBumping, setBadgeBumping] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Inicializa dados do localStorage no cliente
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          // Validação canônica
          const validated = parsed
            .map((item: any) => {
              const product = PRODUCTS.find((p) => p.id === item.id);
              if (!product) return null;
              return {
                id: product.id,
                name: product.name,
                volume: product.volume,
                price: Number(product.price),
                image: product.image,
                qty: Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1)),
              };
            })
            .filter(Boolean) as CartItem[];
          setItems(validated);
        }
      }

      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        if (Array.isArray(parsedOrders)) {
          setOrders(parsedOrders);
        }
      }

      const savedAge = localStorage.getItem(AGE_STORAGE_KEY);
      setIsAgeVerified(savedAge === "true");
    } catch (e) {
      console.error("Erro ao carregar dados locais:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Salva o carrinho no localStorage quando alterado
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  }, [items, isInitialized]);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerBump = () => {
    setBadgeBumping(true);
    setTimeout(() => setBadgeBumping(false), 300);
  };

  const addItem = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.id === productId ? { ...i, qty: Math.min(99, i.qty + 1) } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          volume: product.volume,
          price: Number(product.price),
          image: product.image,
          qty: 1,
        },
      ];
    });

    triggerBump();
    showToast(`✅ ${product.name} adicionado ao pedido!`, "success");
  };

  const updateQuantity = (productId: string, newQty: number) => {
    const qty = parseInt(String(newQty), 10);
    if (isNaN(qty) || qty <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, qty: Math.min(99, qty) } : i))
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    showToast("Item removido do pedido", "info");
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalCount = () => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const getDeliveryFee = () => {
    if (!selectedNeighborhood) return 0;
    const found = STORE_CONFIG.neighborhoods.find((n) => n.name === selectedNeighborhood);
    return found ? found.fee : 0;
  };

  const getGrandTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const confirmAge = () => {
    localStorage.setItem(AGE_STORAGE_KEY, "true");
    setIsAgeVerified(true);
    showToast(`🔞 Bem-vindo à ${STORE_CONFIG.name}! Beba com moderação.`, "info");
  };

  const saveOrder = (
    customer: CustomerInfo,
    paymentMethod: "pix" | "cartao_maquininha" | "dinheiro",
    changeFor?: string,
    notes?: string
  ): Order => {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      date: new Date().toISOString(),
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      customer,
      paymentMethod,
      changeFor,
      notes,
      status: "preparando",
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    } catch (e) {
      console.error("Erro ao salvar histórico de pedidos:", e);
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Erro ao atualizar status do pedido:", e);
      }
      return updated;
    });
    
    const statusText = newStatus === "preparando" ? "Em Preparação" : newStatus === "em_rota" ? "Saiu para Entrega" : "Entregue";
    showToast(`Status do pedido #${orderId} alterado para ${statusText}`, "success");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotalCount,
        getSubtotal,
        selectedNeighborhood,
        setSelectedNeighborhood,
        getDeliveryFee,
        getGrandTotal,
        orders,
        saveOrder,
        updateOrderStatus,
        toasts,
        showToast,
        removeToast,
        isAgeVerified,
        confirmAge,
        badgeBumping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
