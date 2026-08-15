"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, MapPin, ArrowRight, MessageCircle, ShoppingBag } from "lucide-react";
import { STORE_CONFIG } from "@/data/config";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || Math.floor(1000 + Math.random() * 9000).toString();

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 text-center shadow-card">
        
        {/* ÍCONE DE CONFIRMAÇÃO */}
        <div className="w-20 h-20 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-brand-black mb-2 font-heading">
          Pedido Confirmado!
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6">
          Nossa equipe já está separando suas bebidas trincando a -2°C na câmara fria para envio imediato.
        </p>

        {/* DETALHES DO PEDIDO */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5 text-left mb-8 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Código do Pedido:</span>
            <strong className="text-brand-black font-mono font-black text-base">
              #{orderId}
            </strong>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Tempo Estimado:</span>
            <strong className="text-brand-red flex items-center gap-1 font-black">
              <Clock className="w-4 h-4" /> 15 a 20 minutos
            </strong>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Status:</span>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-black px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              Em Preparação
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Região de Atendimento:</span>
            <strong className="text-zinc-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-ice" /> Marabá - PA
            </strong>
          </div>
        </div>

        {/* AÇÕES */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full py-3.5 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-extrabold text-sm sm:text-base transition-all shadow-redGlow flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Voltar para o Cardápio</span>
          </Link>

          <Link
            href="/history"
            className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Ver no Histórico de Pedidos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${STORE_CONFIG.phone}?text=Ol%C3%A1%21+Gostaria+de+acompanhar+meu+pedido+%23${orderId}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand-wa font-bold hover:underline pt-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com o atendente no WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm font-bold text-zinc-500">
          Carregando confirmação...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
