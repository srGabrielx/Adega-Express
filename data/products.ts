import { Product, Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "todos", name: "Todos os Produtos", icon: "⚡" },
  { id: "combos", name: "Combos & Kits", icon: "🔥", tag: "Campeões" },
  { id: "cervejas", name: "Cervejas Geladas", icon: "🍺", tag: "Trincando -2°C" },
  { id: "destilados", name: "Whiskies & Gins", icon: "🥃", tag: "Originais" },
  { id: "vinhos", name: "Vinhos & Espumantes", icon: "🍷", tag: "Selecionados" },
  { id: "nao-alcoolicos", name: "Energéticos & Refris", icon: "🥤", tag: "Super Gelados" },
  { id: "conveniencia", name: "Gelo, Carvão & Petiscos", icon: "🧊", tag: "Essenciais" }
];

export const PRODUCTS: Product[] = [
  // --- COMBOS & KITS PROMOCIONAIS ---
  {
    id: "combo-gin-tanqueray",
    name: "Combo Gin Tanqueray + 4 Red Bull",
    category: "combos",
    volume: "1 Garrafa 750ml + 4 Latas + Gelo Coco",
    price: 139.90,
    originalPrice: 169.90,
    badge: "🔥 Mais Pedido da Noite",
    description: "1 Gin Tanqueray London Dry 750ml + 4 Red Bull (Tradicional ou Tropical) + 2 Gelos de Coco saborizados.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "combo-whisky-red-label",
    name: "Combo Whisky Red Label + 4 Monster",
    category: "combos",
    volume: "1L + 4 Latas 473ml + Gelo + Copos",
    price: 129.90,
    originalPrice: 149.90,
    badge: "⚡ Flash 15min",
    description: "1 Whisky Johnnie Walker Red Label 1L + 4 Energéticos Monster 473ml + 2 Gelos de Coco + 4 Copos descartáveis 700ml.",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "combo-vodka-absolut",
    name: "Combo Vodka Absolut + 4 Red Bull Tropical",
    category: "combos",
    volume: "1 Garrafa 750ml + 4 Latas 250ml",
    price: 119.90,
    originalPrice: 139.90,
    badge: "🍹 Especial Resenha",
    description: "1 Vodka Sueca Absolut Original 750ml + 4 Red Bull Tropical + 2 Gelos de Maracujá/Coco.",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "combo-heineken-fardo",
    name: "Kit Resenha: Fardo Heineken 12x Long Neck",
    category: "combos",
    volume: "12 Garrafas 330ml (Trincando -2°C)",
    price: 79.90,
    originalPrice: 89.90,
    badge: "❄️ Subzero -2°C",
    description: "12 Cervejas Heineken Long Neck 330ml entregues no ponto zero absoluto para beber na hora.",
    image: "https://images.unsplash.com/photo-1608270199042-3004bb45e3d7?auto=format&fit=crop&w=600&q=80"
  },

  // --- CERVEJAS GELADAS ---
  {
    id: "cerveja-heineken-ln",
    name: "Cerveja Heineken Long Neck",
    category: "cervejas",
    volume: "Long Neck 330ml",
    price: 7.49,
    originalPrice: 8.50,
    badge: "❄️ Trincando -2°C",
    description: "A clássica puro malte holandesa servida na temperatura ideal para consumo imediato.",
    image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cerveja-corona-ln",
    name: "Cerveja Corona Extra + Limão",
    category: "cervejas",
    volume: "Long Neck 330ml",
    price: 7.99,
    originalPrice: 8.90,
    badge: "❄️ Geladaça",
    description: "Cerveja leve, refrescante e no ponto certo. Acompanha fatia de limão fresco.",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cerveja-stella-artois",
    name: "Cerveja Stella Artois Pure Gold",
    category: "cervejas",
    volume: "Long Neck 330ml",
    price: 6.99,
    originalPrice: 7.90,
    badge: "✨ Sem Glúten",
    description: "Equilíbrio perfeito de aroma, sabor marcante e pura refrescância.",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cerveja-brahma-duplo-malte-latao",
    name: "Cerveja Brahma Duplo Malte Latão",
    category: "cervejas",
    volume: "Lata 473ml",
    price: 4.89,
    originalPrice: 5.50,
    badge: "🔥 Mais Vendida",
    description: "Cremosidade e sabor acentuado pela combinação do malte Pilsner com o Munich.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cerveja-amstel-latao",
    name: "Cerveja Amstel Puro Malte Latão",
    category: "cervejas",
    volume: "Lata 473ml",
    price: 4.69,
    originalPrice: 5.20,
    badge: "❄️ Trincando",
    description: "Receita puro malte europeia com alta drinkability e espuma cremosa.",
    image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cerveja-budweiser-latao",
    name: "Cerveja Budweiser Latão",
    category: "cervejas",
    volume: "Lata 473ml",
    price: 4.99,
    originalPrice: 5.50,
    badge: "❄️ Trincando",
    description: "King of Beers maturada em madeira de faia para um sabor marcante e suave.",
    image: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cerveja-ipa-colorado-indica",
    name: "Cerveja Colorado Indica IPA",
    category: "cervejas",
    volume: "Garrafa 600ml",
    price: 16.90,
    originalPrice: 19.90,
    badge: "🍺 Artesanal",
    description: "IPA brasileira premiada com lúpulos nobres e toque autêntico de rapadura.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=600&q=80"
  },

  // --- DESTILADOS & WHISKIES ---
  {
    id: "whisky-black-label",
    name: "Whisky Johnnie Walker Black Label 12 Anos",
    category: "destilados",
    volume: "Garrafa 1 Litro",
    price: 169.90,
    originalPrice: 189.90,
    badge: "🥃 12 Anos Original",
    description: "Blend escocês de 12 anos complexo, encorpado e com defumação inconfundível.",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "whisky-jack-daniels-old-7",
    name: "Whisky Jack Daniel's Old No. 7 Tennessee",
    category: "destilados",
    volume: "Garrafa 1 Litro",
    price: 149.90,
    originalPrice: 169.90,
    badge: "⭐ Clássico",
    description: "Autêntico Tennessee Whiskey filtrado gota a gota em carvão de bordo.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "whisky-chivas-12",
    name: "Whisky Chivas Regal 12 Anos",
    category: "destilados",
    volume: "Garrafa 1 Litro",
    price: 154.90,
    originalPrice: 175.00,
    badge: "🥃 Escocês",
    description: "Notas sofisticadas de mel de urze, maçãs maduras e baunilha cremosa.",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gin-tanqueray-london-dry",
    name: "Gin Tanqueray London Dry Importado",
    category: "destilados",
    volume: "Garrafa 750ml",
    price: 109.90,
    originalPrice: 125.00,
    badge: "🍸 Mais Vendido",
    description: "Botânicos selecionados a dedo para o gin tônica perfeito e aromático.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gin-beefeater-pink",
    name: "Gin Beefeater Pink Strawberry London",
    category: "destilados",
    volume: "Garrafa 750ml",
    price: 99.90,
    originalPrice: 115.00,
    badge: "🍓 Frutado",
    description: "Gin premium inglês com infusão natural e sabor marcante de morangos.",
    image: "https://images.unsplash.com/photo-1582819509235-c7e6c4dd7c69?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vodka-absolut-original",
    name: "Vodka Absolut Original Sueca",
    category: "destilados",
    volume: "Garrafa 1 Litro",
    price: 94.90,
    originalPrice: 109.00,
    badge: "⭐ 100% Pura",
    description: "Produzida no sul da Suécia com trigo de inverno e água de poço artesiano profundo.",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vodka-smirnoff-red",
    name: "Vodka Smirnoff Red No. 21",
    category: "destilados",
    volume: "Garrafa 998ml",
    price: 44.90,
    originalPrice: 49.90,
    badge: "🔥 Super Preço",
    description: "Triplamente destilada e dez vezes filtrada para máxima pureza em drinks.",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tequila-jose-cuervo-ouro",
    name: "Tequila Jose Cuervo Especial Gold",
    category: "destilados",
    volume: "Garrafa 750ml",
    price: 119.90,
    originalPrice: 135.00,
    badge: "🌵 Mexicana",
    description: "Autêntica tequila mexicana elaborada com Agave Azul de Jalisco.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80"
  },

  // --- VINHOS & ESPUMANTES ---
  {
    id: "vinho-casillero-cabernet",
    name: "Vinho Casillero del Diablo Cabernet Sauvignon",
    category: "vinhos",
    volume: "Garrafa 750ml",
    price: 54.90,
    originalPrice: 65.00,
    badge: "🍷 Mais Vendido",
    description: "Tinto seco chileno encorpado com notas de groselha, amoras e toque de baunilha.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vinho-catena-malbec",
    name: "Vinho Argentino Catena Zapata Malbec",
    category: "vinhos",
    volume: "Garrafa 750ml",
    price: 169.90,
    originalPrice: 195.00,
    badge: "⭐ Alta Gama",
    description: "Um dos vinhos mais celebrados de Mendoza. Complexo, aveludado e elegante.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "espumante-chandon-brut",
    name: "Espumante Chandon Réserve Brut",
    category: "vinhos",
    volume: "Garrafa 750ml (Gelada)",
    price: 94.90,
    originalPrice: 109.00,
    badge: "🥂 Super Gelado",
    description: "Sofisticado, fresco e equilibrado com notas florais e frutas cítricas.",
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vinho-pergola-tinto-suave",
    name: "Vinho Tinto de Mesa Pérgola Suave",
    category: "vinhos",
    volume: "Garrafa 1 Litro",
    price: 26.90,
    originalPrice: 32.00,
    badge: "🔥 Campeão",
    description: "Vinho de mesa tinto suave e adocicado da Serra Gaúcha, sabor leve e frutado.",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80"
  },

  // --- NÃO ALCOÓLICOS & ENERGÉTICOS ---
  {
    id: "energetico-red-bull-trad",
    name: "Energético Red Bull Energy Drink 250ml",
    category: "nao-alcoolicos",
    volume: "Lata 250ml (Trincando)",
    price: 8.99,
    originalPrice: 10.00,
    badge: "⚡ Gelado -2°C",
    description: "Red Bull Te Dá Asas. Ideal para misturar com destilados ou beber bem gelado.",
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "energetico-red-bull-tropical",
    name: "Energético Red Bull Tropical Edition",
    category: "nao-alcoolicos",
    volume: "Lata 250ml",
    price: 8.99,
    originalPrice: 10.00,
    badge: "🌴 Sabores",
    description: "Sabor refrescante de frutas tropicais para turbinar seu drink.",
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "energetico-monster-energy",
    name: "Energético Monster Energy Latão 473ml",
    category: "nao-alcoolicos",
    volume: "Lata 473ml",
    price: 9.99,
    originalPrice: 11.50,
    badge: "🔋 Lata Grande",
    description: "Energia em dobro com sabor potente e marcante na lata de 473ml.",
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "refrigerante-coca-cola-2l",
    name: "Refrigerante Coca-Cola Original 2 Litros",
    category: "nao-alcoolicos",
    volume: "Garrafa Pet 2L (Trincando)",
    price: 11.90,
    originalPrice: 13.50,
    badge: "❄️ Trincando",
    description: "A clássica Coca-Cola trincando de gelada entregue na hora.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "refrigerante-guarana-antarctica-2l",
    name: "Refrigerante Guaraná Antarctica 2L",
    category: "nao-alcoolicos",
    volume: "Garrafa Pet 2 Litros",
    price: 9.90,
    originalPrice: 11.50,
    badge: "🇧🇷 O Original",
    description: "O sabor do Brasil com extrato de guaraná 100% natural.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "agua-mineral-com-gas",
    name: "Água Mineral com Gás Crystal 500ml",
    category: "nao-alcoolicos",
    volume: "Garrafa 500ml (Gelada)",
    price: 3.50,
    originalPrice: 4.00,
    badge: "💧 Gelada",
    description: "Água mineral pura e intensamente gaseificada.",
    image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=600&q=80"
  },

  // --- CONVENIÊNCIA, GELO & PETISCOS ---
  {
    id: "gelo-em-cubo-5kg",
    name: "Saco de Gelo Filtrado em Cubo 5kg",
    category: "conveniencia",
    volume: "Pacote 5kg",
    price: 14.00,
    originalPrice: 16.00,
    badge: "🧊 Essencial",
    description: "Gelo cristalino feito com água purificada para coolers e drinks.",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "gelo-saborizado-coco",
    name: "Gelo de Coco / Maracujá Saborizado",
    category: "conveniencia",
    volume: "Copinho 200ml",
    price: 4.50,
    originalPrice: 5.00,
    badge: "🥥 Para Gin/Whisky",
    description: "Água de coco e polpa natural para dar o toque gourmet ao seu copo.",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "carvao-vegetal-3kg",
    name: "Carvão Vegetal Especial para Churrasco 3kg",
    category: "conveniencia",
    volume: "Saco 3kg",
    price: 22.00,
    originalPrice: 25.00,
    badge: "🥩 Churrasco",
    description: "Carvão de alta densidade que acende fácil e dura muito mais na brasa.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "copos-descartaveis-500ml",
    name: "Pacote de Copos Descartáveis 500ml (50 unid.)",
    category: "conveniencia",
    volume: "Pacote c/ 50 unidades",
    price: 12.00,
    originalPrice: 15.00,
    badge: "🎉 Resenha",
    description: "Copos reforçados de 500ml resistentes para drinks e chopp.",
    image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "salgadinho-doritos-140g",
    name: "Salgadinho Doritos Queijo Nacho 140g",
    category: "conveniencia",
    volume: "Pacote 140g",
    price: 12.90,
    originalPrice: 14.50,
    badge: "🧀 Petisco",
    description: "Tortilhas crocantes de milho sabor Queijo Nacho.",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "amendoim-japones-crocante",
    name: "Amendoim Japonês Crocante 200g",
    category: "conveniencia",
    volume: "Pacote 200g",
    price: 6.90,
    originalPrice: 8.00,
    badge: "🥜 Petisco",
    description: "Crocante e salgado no ponto perfeito para acompanhar sua cerveja trincando.",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
  }
];
