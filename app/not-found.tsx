"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Beer, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Se o usuário acessar rotas antigas com .html no navegador, redireciona suavemente
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.includes("index.html") || path.endsWith("/index")) {
        router.replace("/");
      } else if (path.includes("checkout.html")) {
        router.replace("/checkout");
      } else if (path.includes("history.html")) {
        router.replace("/history");
      } else if (path.includes("order-success.html")) {
        router.replace("/checkout/success");
      }
    }
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-card">
        <div className="w-16 h-16 bg-red-100 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Beer className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="text-4xl font-black text-brand-red font-heading block mb-2">
          404
        </span>

        <h1 className="text-xl font-extrabold text-brand-black mb-2 font-heading">
          Página Não Encontrada
        </h1>

        <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed">
          O link acessado mudou ou não existe mais. Clique abaixo para voltar ao cardápio de bebidas.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-extrabold text-sm transition-all shadow-redGlow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Cardápio</span>
        </Link>
      </div>
    </div>
  );
}
