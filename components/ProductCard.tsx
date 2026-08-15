"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, Snowflake } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);
  const inCartItem = items.find((i) => i.id === product.id);

  const fallbackImage = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between shadow-subtle hover:shadow-cardHover hover:border-zinc-300 transition-all duration-200 group relative overflow-hidden h-full">
      
      {/* BADGE DE TEMPERATURA / DESTAQUE */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm tracking-wide">
          {product.badge}
        </span>
      )}

      <div>
        {/* IMAGEM DO PRODUTO */}
        <div className="w-full aspect-square bg-zinc-100 rounded-xl overflow-hidden mb-3.5 relative flex items-center justify-center">
          <Image
            src={imgError ? fallbackImage : product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        </div>

        {/* INFORMAÇÕES DO PRODUTO */}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            {product.volume}
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-brand-black leading-snug line-clamp-2 min-h-[2.6rem] mb-1 font-heading">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>
      </div>

      {/* PREÇO E BOTÃO DE COMPRA */}
      <div className="pt-2 border-t border-zinc-100 mt-auto">
        <div className="flex items-baseline gap-2 mb-3">
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="text-lg sm:text-xl font-black text-brand-red font-heading">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        {inCartItem ? (
          <div className="flex items-center justify-between bg-brand-red text-white rounded-xl shadow-redGlow overflow-hidden h-11 w-full">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, inCartItem.qty - 1)}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/20 transition-colors font-bold text-lg"
              title="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-black text-sm px-2">
              {inCartItem.qty} no pedido
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, inCartItem.qty + 1)}
              className="w-11 h-11 flex items-center justify-center hover:bg-black/20 transition-colors font-bold text-lg"
              title="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="w-full h-11 bg-brand-black hover:bg-brand-red text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-150 shadow-sm hover:shadow-redGlow active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Adicionar</span>
          </button>
        )}
      </div>

    </div>
  );
}
