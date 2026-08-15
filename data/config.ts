import { Neighborhood, PaymentMethodOption } from "@/types";

export const STORE_CONFIG = {
  name: "Adega Express",
  brandAccent: "EXPRESS",
  tagline: "Bebida Trincando em 15 Minutos na Sua Porta",
  description: "Cervejas trincando a -2°C, combos completos, whiskies 12 anos e petiscos com entrega flash em até 15 minutos em Marabá - PA.",
  phone: "5511964589578", // WhatsApp formato para API (apenas dígitos)
  phoneFormatted: "(11) 96458-9578",
  instagram: "@adegaexpress.15min",
  instagramUrl: "https://instagram.com",
  pixKey: "11964589578",
  pixKeyType: "Celular",
  pixBeneficiary: "Adega Express Delivery LTDA",
  address: "Marabá - PA",
  minOrderValue: 20.00,
  averageDeliveryTime: "15 a 20 min",
  status: {
    isOpen: true,
    openingHoursText: "Seg a Qui: 17h às 02h | Sex e Sáb: 15h às 05h | Dom: 13h às 01h",
    currentBadge: "🟢 Aberto Agora • Entrega em 15 min"
  },
  neighborhoods: [
    { name: "Nova Marabá (Folhas)", fee: 5.00, time: "10-15 min" },
    { name: "Marabá Pioneira", fee: 6.00, time: "15-20 min" },
    { name: "Cidade Nova", fee: 7.00, time: "15-20 min" },
    { name: "Laranjeiras", fee: 7.00, time: "15-20 min" },
    { name: "Bairro Amapá", fee: 7.00, time: "15-20 min" },
    { name: "Novo Horizonte", fee: 8.00, time: "15-20 min" },
    { name: "Belo Horizonte", fee: 8.00, time: "15-20 min" },
    { name: "Liberdade", fee: 8.00, time: "15-20 min" },
    { name: "Santa Rosa", fee: 6.00, time: "15-20 min" },
    { name: "Nossa Sra. Aparecida", fee: 8.00, time: "15-20 min" },
    { name: "São Félix", fee: 10.00, time: "20-30 min" },
    { name: "Morada Nova", fee: 12.00, time: "25-35 min" },
    { name: "Outro Bairro (Consultar via WhatsApp)", fee: 10.00, time: "Consultar" }
  ] as Neighborhood[],
  paymentMethods: [
    { 
      id: "pix", 
      name: "Pix Imediato", 
      icon: "⚡", 
      description: "Chave Copia e Cola instantânea" 
    },
    { 
      id: "cartao_maquininha", 
      name: "Cartão Débito / Crédito", 
      icon: "💳", 
      description: "O motoboy leva a maquininha até você" 
    },
    { 
      id: "dinheiro", 
      name: "Dinheiro", 
      icon: "💵", 
      description: "Pague na entrega (informe troco se precisar)" 
    }
  ] as PaymentMethodOption[]
};
