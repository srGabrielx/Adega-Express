export interface Product {
  id: string;
  name: string;
  category: "combos" | "cervejas" | "destilados" | "vinhos" | "nao-alcoolicos" | "conveniencia";
  volume: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  tag?: string;
}

export interface CartItem {
  id: string;
  name: string;
  volume: string;
  price: number;
  image: string;
  qty: number;
}

export interface Neighborhood {
  name: string;
  fee: number;
  time: string;
}

export interface PaymentMethodOption {
  id: "pix" | "cartao_maquininha" | "dinheiro";
  name: string;
  icon: string;
  description: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  reference?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: "pix" | "cartao_maquininha" | "dinheiro";
  changeFor?: string;
  notes?: string;
  status: "preparando" | "em_rota" | "entregue";
}
