"use client";

import React from "react";
import { Zap, ShoppingCart, Snowflake, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";

export default function HeroSection() {
  const { addItem, items, updateQuantity } = useCart();
  const highlightId = "combo-gin-tanqueray";
  const inCartItem = items.find((i) => i.id === highlightId);

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToCombos = () => {
    const el = document.getElementById("shelf-combos");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      scrollToCatalog();
    }
  };

  return (
    <section className="bg-gradient-to-b from-white via-zinc-50 to-zinc-100 border-b border-zinc-200 py-8 sm:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* TEXTO PRINCIPAL HERO COM ALTO CONTRASTE */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-redLight border border-red-200 text-brand-red rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Entrega Recorde em 15 Minutos</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-brand-black tracking-tight leading-[1.12] mb-4">
              Sua bebida <span className="text-brand-ice relative inline-block">trincando</span> na sua porta em <span className="text-brand-red">15 minutos!</span>
            </h1>

            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-6 max-w-xl font-medium">
              Cervejas estalando a -2°C, combos completos com gelo, whiskies 12 anos e destilados originais. Pediu no site, chegou rapidinho em Marabá - PA.
            </p>

            {/* CTAs OTIMIZADOS SEM DUPLICIDADE DE AÇÃO */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-black text-base transition-all duration-200 shadow-redGlow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
                <span>Pedir Bebidas Agora</span>
              </button>

              <button
                type="button"
                onClick={scrollToCombos}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-100 text-brand-black border-2 border-brand-black rounded-xl font-black text-base transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ver Ofertas & Combos</span>
              </button>
            </div>
          </div>

          {/* CARD DESTAQUE MODULAR SUBZERO */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-card hover:shadow-cardHover transition-shadow duration-200 relative overflow-hidden">
              
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="inline-flex items-center gap-1.5 bg-brand-ice text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide">
                  <Snowflake className="w-3.5 h-3.5 animate-spin" /> Destaque Subzero -2°C
                </span>
                <span className="text-xs font-black text-brand-red bg-brand-redLight px-2.5 py-0.5 rounded-lg">
                  Economize R$ 30
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-brand-black font-heading leading-tight mb-2">
                Combo Gin Tanqueray + 4 Red Bull
              </h2>

              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-5">
                1 Gin London Dry 750ml + 4 Latas Red Bull + 2 Gelos de Coco saborizados prontos para servir.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mb-4">
                <div>
                  <span className="text-xs text-zinc-400 line-through block font-bold">R$ 169,90</span>
                  <span className="text-2xl sm:text-3xl font-black text-brand-red font-heading">R$ 139,90</span>
                </div>

                {inCartItem ? (
                  <div className="flex items-center bg-brand-red text-white rounded-xl shadow-redGlow overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(highlightId, inCartItem.qty - 1)}
                      className="px-3.5 py-2.5 text-lg font-bold hover:bg-black/20 transition-colors"
                      title="Diminuir"
                    >
                      -
                    </button>
                    <span className="px-3 font-black text-sm">{inCartItem.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(highlightId, inCartItem.qty + 1)}
                      className="px-3.5 py-2.5 text-lg font-bold hover:bg-black/20 transition-colors"
                      title="Aumentar"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => addItem(highlightId)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-black text-sm transition-all duration-150 shadow-redGlow active:scale-95"
                  >
                    <span>+ Adicionar</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/80 rounded-xl px-4 py-2.5">
                <span className="text-xs font-extrabold text-zinc-700">Tempo Médio de Entrega:</span>
                <span className="text-sm font-black text-brand-red flex items-center gap-1 font-heading">
                  <Zap className="w-4 h-4 fill-current" /> 15 a 20 min
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
