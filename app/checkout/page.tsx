"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Copy,
  CreditCard,
  Banknote,
  Zap,
  ShoppingBag,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";
import { CustomerInfo } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    selectedNeighborhood,
    setSelectedNeighborhood,
    getDeliveryFee,
    getGrandTotal,
    saveOrder,
    showToast,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    neighborhood: selectedNeighborhood || "",
    street: "",
    number: "",
    complement: "",
    reference: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao_maquininha" | "dinheiro">("pix");
  const [changeFor, setChangeFor] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [copiedPix, setCopiedPix] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const grandTotal = getGrandTotal();

  const handleNeighborhoodChange = (name: string) => {
    setSelectedNeighborhood(name);
    setCustomer((prev) => ({ ...prev, neighborhood: name }));
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixKey);
    setCopiedPix(true);
    showToast("Chave Pix copiada com sucesso!", "success");
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast("Seu carrinho está vazio!", "error");
      return;
    }

    if (!customer.name.trim() || customer.name.trim().length < 3) {
      showToast("Por favor, preencha seu nome completo.", "error");
      return;
    }

    if (!customer.phone.trim() || customer.phone.trim().length < 8) {
      showToast("Por favor, preencha um número de WhatsApp válido.", "error");
      return;
    }

    if (!customer.neighborhood) {
      showToast("Por favor, selecione seu bairro em Marabá.", "error");
      return;
    }

    if (!customer.street.trim() || !customer.number.trim()) {
      showToast("Por favor, preencha o nome da rua e o número.", "error");
      return;
    }

    setIsSubmitting(true);

    // Salva o pedido localmente
    const createdOrder = saveOrder(customer, paymentMethod, changeFor, notes);

    // Formata a mensagem para o WhatsApp
    const itemsListText = createdOrder.items
      .map(
        (item) =>
          `▪️ *${item.qty}x* ${item.name} (${item.volume}) - R$ ${(item.price * item.qty).toFixed(2).replace(".", ",")}`
      )
      .join("\n");

    const paymentText =
      paymentMethod === "pix"
        ? "⚡ Pix (Chave Imediata)"
        : paymentMethod === "cartao_maquininha"
        ? "💳 Cartão de Débito/Crédito (Levar maquininha)"
        : `💵 Dinheiro ${changeFor ? `(Troco para: ${changeFor})` : "(Sem troco)"}`;

    const waMessage = `🍺 *NOVO PEDIDO EXPRESS - #${createdOrder.id}*
--------------------------------
👤 *Cliente:* ${customer.name}
📱 *WhatsApp:* ${customer.phone}
📍 *Entrega:* ${customer.street}, Nº ${customer.number}${customer.complement ? ` (${customer.complement})` : ""}
🏘️ *Bairro:* ${customer.neighborhood} - Marabá PA
${customer.reference ? `🚩 *Ponto de Ref:* ${customer.reference}\n` : ""}
--------------------------------
🛒 *ITENS DO PEDIDO:*
${itemsListText}

--------------------------------
💰 *Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}
🛵 *Taxa de Entrega:* R$ ${deliveryFee.toFixed(2).replace(".", ",")}
💵 *TOTAL A PAGAR:* R$ ${grandTotal.toFixed(2).replace(".", ",")}
--------------------------------
💳 *Forma de Pagamento:* ${paymentText}
${notes ? `📝 *Observações:* ${notes}\n` : ""}
⚡ *Tempo estimado:* 15 a 20 minutos (Bebidas a -2°C)`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${STORE_CONFIG.phone}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(waUrl, "_blank");

    // Redireciona para página de sucesso
    router.push(`/checkout/success?id=${createdOrder.id}`);
  };

  // Se o carrinho estiver vazio
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center my-auto">
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="w-20 h-20 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-black mb-3 font-heading">
            Seu carrinho está vazio
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
            Adicione suas cervejas estalando a -2°C, combos de Gin ou destilados para pedir com entrega em 15 minutos.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-extrabold text-sm sm:text-base transition-all shadow-redGlow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ir para o Cardápio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* CABEÇALHO DO CHECKOUT */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continuar Comprando</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-black text-brand-black font-heading">
            Meu Pedido Express
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          
          {/* ETAPA 1: ITENS DO PEDIDO */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-100">
              <span className="w-7 h-7 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-black">
                1
              </span>
              <h2 className="text-base sm:text-lg font-black text-brand-black font-heading">
                Itens do Pedido ({items.length})
              </h2>
            </div>

            <div className="divide-y divide-zinc-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 bg-zinc-100 rounded-xl overflow-hidden shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-brand-black truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 block">
                        {item.volume}
                      </span>
                      <span className="text-xs font-extrabold text-brand-red">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>

                  {/* CONTROLE DE QUANTIDADE */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                        title="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                        title="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-zinc-400 hover:text-brand-red transition-colors"
                      title="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ETAPA 2: ENDEREÇO DE ENTREGA */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-100">
              <span className="w-7 h-7 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-black">
                2
              </span>
              <h2 className="text-base sm:text-lg font-black text-brand-black font-heading">
                Endereço de Entrega (15 a 20 Min)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Seu Nome Completo <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Ex: Carlos Oliveira"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  WhatsApp para Contato <span className="text-brand-red">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="(94) 99999-9999"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Bairro em Marabá - PA <span className="text-brand-red">*</span>
                </label>
                <select
                  required
                  value={customer.neighborhood}
                  onChange={(e) => handleNeighborhoodChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold focus:border-brand-red focus:bg-white outline-none transition-colors cursor-pointer"
                >
                  <option value="">-- Selecione seu Bairro --</option>
                  {STORE_CONFIG.neighborhoods.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name} - Taxa: R$ {n.fee.toFixed(2).replace(".", ",")} ({n.time})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Rua / Avenida <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.street}
                  onChange={(e) => setCustomer({ ...customer, street: e.target.value })}
                  placeholder="Ex: Av. Tocantins"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Número <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.number}
                  onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
                  placeholder="Ex: 450"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Complemento / Apto
                </label>
                <input
                  type="text"
                  value={customer.complement}
                  onChange={(e) => setCustomer({ ...customer, complement: e.target.value })}
                  placeholder="Ex: Apto 302, Bloco B (Opcional)"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Ponto de Referência
                </label>
                <input
                  type="text"
                  value={customer.reference}
                  onChange={(e) => setCustomer({ ...customer, reference: e.target.value })}
                  placeholder="Ex: Em frente à praça / próximo ao posto"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* ETAPA 3: FORMA DE PAGAMENTO */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-100">
              <span className="w-7 h-7 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-black">
                3
              </span>
              <h2 className="text-base sm:text-lg font-black text-brand-black font-heading">
                Forma de Pagamento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <label
                className={`p-3.5 rounded-xl border-2 flex flex-col gap-1 cursor-pointer transition-all ${
                  paymentMethod === "pix"
                    ? "border-brand-red bg-red-50/50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm text-brand-black flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-brand-red fill-current" /> Pix Imediato
                  </span>
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === "pix"}
                    onChange={() => setPaymentMethod("pix")}
                    className="accent-brand-red"
                  />
                </div>
                <span className="text-[11px] text-zinc-500">
                  Cópia de chave instantânea
                </span>
              </label>

              <label
                className={`p-3.5 rounded-xl border-2 flex flex-col gap-1 cursor-pointer transition-all ${
                  paymentMethod === "cartao_maquininha"
                    ? "border-brand-red bg-red-50/50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm text-brand-black flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-brand-ice" /> Cartão
                  </span>
                  <input
                    type="radio"
                    name="payment"
                    value="cartao_maquininha"
                    checked={paymentMethod === "cartao_maquininha"}
                    onChange={() => setPaymentMethod("cartao_maquininha")}
                    className="accent-brand-red"
                  />
                </div>
                <span className="text-[11px] text-zinc-500">
                  Levamos a maquininha
                </span>
              </label>

              <label
                className={`p-3.5 rounded-xl border-2 flex flex-col gap-1 cursor-pointer transition-all ${
                  paymentMethod === "dinheiro"
                    ? "border-brand-red bg-red-50/50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm text-brand-black flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-brand-green" /> Dinheiro
                  </span>
                  <input
                    type="radio"
                    name="payment"
                    value="dinheiro"
                    checked={paymentMethod === "dinheiro"}
                    onChange={() => setPaymentMethod("dinheiro")}
                    className="accent-brand-red"
                  />
                </div>
                <span className="text-[11px] text-zinc-500">
                  Pague na entrega
                </span>
              </label>
            </div>

            {/* Box Chave Pix */}
            {paymentMethod === "pix" && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2 mb-4">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div>
                    <span className="font-bold text-zinc-700">Chave Pix Celular: </span>
                    <code className="bg-zinc-200 px-2 py-0.5 rounded font-mono font-bold text-brand-black">
                      {STORE_CONFIG.pixKey}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="inline-flex items-center gap-1 text-xs font-black text-brand-red hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedPix ? "Copiado!" : "Copiar Chave"}</span>
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Favorecido: <strong className="text-zinc-700">{STORE_CONFIG.pixBeneficiary}</strong>
                </p>
              </div>
            )}

            {/* Troco para Dinheiro */}
            {paymentMethod === "dinheiro" && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Precisa de troco para quanto?
                </label>
                <input
                  type="text"
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                  placeholder="Ex: R$ 100,00 ou Não preciso de troco"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none"
                />
              </div>
            )}

            {/* Observações */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Observações do Pedido (Opcional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Mandar copos descartáveis, caprichar no gelo..."
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-brand-red focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* ETAPA 4: RESUMO FINANCEIRO & FINALIZAR */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3 mb-2 pb-3 border-b border-zinc-100">
              <span className="w-7 h-7 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-black">
                4
              </span>
              <h2 className="text-base sm:text-lg font-black text-brand-black font-heading">
                Resumo Financeiro
              </h2>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-600">
              <span>Subtotal dos Produtos:</span>
              <strong className="text-brand-black">
                R$ {subtotal.toFixed(2).replace(".", ",")}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-600">
              <span>Taxa de Entrega Express:</span>
              <strong className={customer.neighborhood ? "text-brand-black" : "text-amber-600"}>
                {customer.neighborhood
                  ? `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`
                  : "Selecione o bairro"}
              </strong>
            </div>

            <div className="flex items-center justify-between text-base sm:text-lg font-black pt-3 border-t border-dashed border-zinc-200">
              <span className="text-brand-black">Total a Pagar:</span>
              <span className="text-2xl font-black text-brand-red font-heading">
                R$ {grandTotal.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !customer.neighborhood}
              className="w-full py-4 bg-brand-red hover:bg-brand-redHover disabled:bg-zinc-300 text-white rounded-2xl font-black text-base sm:text-lg transition-all duration-150 shadow-redGlow hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 mt-4"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Finalizar Pedido Express</span>
            </button>

            <p className="text-[11px] text-zinc-400 text-center pt-2">
              🔒 Ao finalizar, o pedido será enviado ao nosso WhatsApp e preparado imediatamente para entrega em 15 minutos.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
