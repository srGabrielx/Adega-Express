"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Package, RefreshCw, CheckCircle2, Truck, Clock, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { orders, updateOrderStatus } = useCart();
  const [filter, setFilter] = useState<"todos" | "preparando" | "em_rota" | "entregue">("todos");

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const filteredOrders = orders.filter(
    (order) => filter === "todos" || order.status === filter
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparando":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
            <Clock className="w-3.5 h-3.5" />
            Em Preparação
          </span>
        );
      case "em_rota":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
            <Truck className="w-3.5 h-3.5" />
            Saiu para Entrega
          </span>
        );
      case "entregue":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-black">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Entregue
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Navbar Admin */}
      <header className="bg-brand-black text-white px-6 py-4 border-b-4 border-brand-red flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-brand-red p-2 rounded-xl">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black font-heading leading-none">Adega Express</h1>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Painel Administrativo</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black text-brand-black font-heading mb-1">
              Gerenciador de Pedidos
            </h2>
            <p className="text-sm text-zinc-500 font-medium">
              Acompanhe e atualize os status dos pedidos em tempo real.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-sm overflow-x-auto max-w-full">
            {[
              { id: "todos", label: "Todos" },
              { id: "preparando", label: "Em Preparo" },
              { id: "em_rota", label: "Em Rota" },
              { id: "entregue", label: "Entregues" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  filter === f.id
                    ? "bg-brand-black text-white shadow-sm"
                    : "text-zinc-500 hover:text-brand-black hover:bg-zinc-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center shadow-sm">
              <Package className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-lg font-black text-brand-black">Nenhum pedido encontrado.</h3>
              <p className="text-sm text-zinc-500 mt-1">
                Não há pedidos com o status selecionado no momento.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Cabeçalho do Pedido */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex flex-col items-center justify-center border border-zinc-200">
                      <span className="text-[10px] font-bold text-zinc-400 leading-none">PEDIDO</span>
                      <span className="text-sm font-black text-brand-black leading-none mt-1">#{order.id}</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-brand-black">{order.customer.name}</h4>
                      <p className="text-xs text-zinc-500">
                        {new Date(order.date).toLocaleString("pt-BR", {
                          day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    
                    {/* Controles de Status */}
                    <div className="flex bg-zinc-100 rounded-lg p-1 border border-zinc-200">
                      <button
                        onClick={() => updateOrderStatus(order.id, "preparando")}
                        className={`p-1.5 rounded-md transition-colors ${order.status === "preparando" ? "bg-white shadow-sm ring-1 ring-zinc-200 pointer-events-none" : "hover:bg-zinc-200 text-zinc-400 hover:text-amber-600"}`}
                        title="Marcar como Em Preparação"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "em_rota")}
                        className={`p-1.5 rounded-md transition-colors ${order.status === "em_rota" ? "bg-white shadow-sm ring-1 ring-zinc-200 pointer-events-none" : "hover:bg-zinc-200 text-zinc-400 hover:text-blue-600"}`}
                        title="Marcar como Saiu para Entrega"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "entregue")}
                        className={`p-1.5 rounded-md transition-colors ${order.status === "entregue" ? "bg-white shadow-sm ring-1 ring-zinc-200 pointer-events-none" : "hover:bg-zinc-200 text-zinc-400 hover:text-green-600"}`}
                        title="Marcar como Entregue"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Corpo do Pedido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Endereço e Detalhes */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-bold text-zinc-800">
                          {order.customer.street}, {order.customer.number}
                          {order.customer.complement && ` - ${order.customer.complement}`}
                        </p>
                        <p className="text-zinc-500">{order.customer.neighborhood}</p>
                        {order.customer.reference && (
                          <p className="text-zinc-500 italic mt-1 text-xs">Ref: {order.customer.reference}</p>
                        )}
                        <p className="text-zinc-600 mt-1 font-medium">📞 {order.customer.phone}</p>
                      </div>
                    </div>

                    <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100 text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-500 font-bold">Pagamento:</span>
                        <span className="font-extrabold text-zinc-800 uppercase">
                          {order.paymentMethod.replace("_", " ")}
                        </span>
                      </div>
                      {order.changeFor && (
                        <div className="flex justify-between mb-1">
                          <span className="text-zinc-500 font-bold">Troco para:</span>
                          <span className="font-extrabold text-brand-green">R$ {order.changeFor}</span>
                        </div>
                      )}
                      {order.notes && (
                        <div className="mt-2 pt-2 border-t border-zinc-200">
                          <span className="text-zinc-500 font-bold block mb-0.5">Observações:</span>
                          <span className="text-zinc-700 italic">{order.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Itens do Pedido */}
                  <div>
                    <h5 className="text-xs font-black text-zinc-400 uppercase tracking-wider mb-3">Itens do Pedido</h5>
                    <div className="space-y-2 mb-4 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="bg-brand-red/10 text-brand-red font-black px-2 py-0.5 rounded-md text-xs">
                              {item.qty}x
                            </span>
                            <span className="font-bold text-zinc-700 truncate max-w-[200px]" title={item.name}>
                              {item.name}
                            </span>
                          </div>
                          <span className="font-black text-zinc-900">
                            R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 space-y-1 text-sm">
                      <div className="flex justify-between text-zinc-500 font-bold">
                        <span>Subtotal</span>
                        <span>R$ {order.subtotal.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between text-zinc-500 font-bold">
                        <span>Taxa de Entrega</span>
                        <span>R$ {order.deliveryFee.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between text-brand-black font-black text-base pt-2">
                        <span>Total</span>
                        <span className="text-brand-red">R$ {order.total.toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
