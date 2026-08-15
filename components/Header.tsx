"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Clock, Beer } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";

export default function Header() {
  const { getTotalCount, badgeBumping } = useCart();
  const totalCount = getTotalCount();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* LOGO DA MARCA */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 select-none"
            title="Adega Express - Página Inicial"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-brand-red text-white rounded-xl flex items-center justify-center shadow-redGlow group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Beer className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 leading-none font-black text-lg sm:text-xl text-brand-black tracking-tight font-heading">
                <span>ADEGA</span>
                <span className="text-brand-red">{STORE_CONFIG.brandAccent}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">
                Delivery 15 Min • Subzero
              </span>
            </div>
          </Link>

          {/* STATUS DA LOJA & AÇÕES */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Status Aberto (Escondido em telas muito pequenas) */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-brand-iceLight text-brand-ice border border-brand-iceBorder rounded-full text-xs font-bold whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              <span>Aberto Agora • Entrega em 15 min</span>
            </div>

            {/* Link para Histórico de Pedidos */}
            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 rounded-xl font-bold text-xs sm:text-sm transition-colors duration-150 min-h-[42px]"
              title="Ver Meus Pedidos"
            >
              <Clock className="w-4 h-4 text-zinc-600" />
              <span className="hidden xs:inline">Pedidos</span>
            </Link>

            {/* Botão Meu Pedido / Checkout */}
            <Link
              href="/checkout"
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-brand-black hover:bg-brand-red text-white rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md min-h-[42px] relative group ${
                badgeBumping ? "scale-105" : ""
              }`}
              title="Abrir Carrinho e Finalizar Pedido"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="hidden sm:inline">Meu Pedido</span>
              
              {totalCount > 0 && (
                <span
                  className={`bg-brand-red group-hover:bg-white group-hover:text-brand-red text-white text-xs font-black px-2 py-0.5 rounded-full transition-transform duration-200 ${
                    badgeBumping ? "scale-125" : "scale-100"
                  }`}
                >
                  {totalCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
