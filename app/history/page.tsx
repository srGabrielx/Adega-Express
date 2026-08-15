"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ShoppingBag, CheckCircle, Package, ArrowRight, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderHistoryPage() {
  const { orders, addItem, showToast } = useCart();

  const handleReorder = (orderItems: { id: string; name: string }[]) => {
    orderItems.forEach((item) => {
      addItem(item.id);
    });
    showToast("Itens adicionados novamente ao seu carrinho!", "success");
  };

  return (
    <div className="py-8 sm:py-12 bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* CABEÇALHO DO HISTÓRICO */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Cardápio</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-black text-brand-black font-heading">
            📋 Meus Pedidos
          </h1>
        </div>

        {/* ESTADO VAZIO */}
        {orders.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm my-8">
            <div className="w-20 h-20 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-black mb-2 font-heading">
              Nenhum pedido realizado ainda
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Seus pedidos express finalizados aparecerão aqui automaticamente para você acompanhar ou repetir quando quiser.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-extrabold text-sm transition-all shadow-redGlow"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Fazer meu primeiro pedido</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const dateObj = new Date(order.date);
              const formattedDate =
                dateObj.toLocaleDateString("pt-BR") +
                " às " +
                dateObj.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

              return (
                <div
                  key={order.id}
                  className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm border-l-4 border-l-brand-green space-y-3.5"
                >
                  {/* CABEÇALHO DO CARD */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div>
                      <span className="font-black text-base text-brand-black font-mono">
                        #{order.id}
                      </span>
                      <span className="text-xs text-zinc-400 block mt-0.5">
                        {formattedDate}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-black px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                      <span>{order.status === "preparando" ? "Em Preparação" : "Entregue"}</span>
                    </span>
                  </div>

                  {/* LISTA DE ITENS */}
                  <div className="space-y-1.5 py-1">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs sm:text-sm text-zinc-700"
                      >
                        <div>
                          <span className="font-extrabold text-brand-red mr-1.5">
                            {item.qty}x
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-bold text-zinc-900">
                          R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* ENDEREÇO E DETALHES */}
                  <div className="bg-zinc-50 rounded-xl p-3 text-xs text-zinc-500 space-y-1">
                    <div>
                      📍 <strong>Entrega:</strong> {order.customer.street}, {order.customer.number} - {order.customer.neighborhood}
                    </div>
                    <div>
                      💳 <strong>Pagamento:</strong> {order.paymentMethod === "pix" ? "Pix Imediato" : order.paymentMethod === "cartao_maquininha" ? "Cartão na Maquininha" : "Dinheiro"}
                    </div>
                  </div>

                  {/* TOTAL E REORDENAÇÃO */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                    <div className="text-sm font-bold text-zinc-800">
                      Total: <span className="text-base font-black text-brand-red font-heading">R$ {order.total.toFixed(2).replace(".", ",")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleReorder(order.items)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-brand-red hover:text-white text-zinc-700 rounded-xl font-bold text-xs transition-colors"
                        title="Adicionar itens novamente ao carrinho"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Repetir Pedido</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
