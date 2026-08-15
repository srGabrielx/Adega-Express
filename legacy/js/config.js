/**
 * Configurações da Adega & Delivery Express 15 Min
 */
const STORE_CONFIG = {
  name: "Adega Express",
  tagline: "Bebida Trincando em 15 Minutos na Sua Porta",
  description: "Cervejas geladas a -2°C, combos, whiskies e petiscos com entrega flash em até 15 minutos.",
  phone: "5511964589578", // Formato: DDI + DDD + Número (apenas dígitos)
  phoneFormatted: "(11) 96458-9578",
  instagram: "@adegaexpress.15min",
  instagramUrl: "https://instagram.com",
  pixKey: "11964589578",
  pixKeyType: "Celular",
  pixBeneficiary: "Adega Express Delivery LTDA",
  address: "Marabá - PA",
  minOrderValue: 20.00,
  averageDeliveryTime: "15 min",
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
  ],
  paymentMethods: [
    { id: "pix", name: "Pix (Chave com desconto imediato)", icon: "⚡" },
    { id: "cartao_maquininha", name: "Cartão de Crédito/Débito (Levamos a maquininha)", icon: "💳" },
    { id: "dinheiro", name: "Dinheiro (Informe se precisa de troco)", icon: "💵" }
  ]
};
