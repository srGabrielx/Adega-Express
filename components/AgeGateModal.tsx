"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function AgeGateModal() {
  const { isAgeVerified, confirmAge } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isAgeVerified) return null;

  const handleDeny = () => {
    alert("A venda de bebidas alcoólicas é proibida para menores de 18 anos (Lei 8.069/1990). Redirecionando...");
    window.location.href = "https://www.google.com.br";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-zinc-200">
        
        <div className="w-16 h-16 bg-red-100 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <span className="text-2xl font-black font-heading">18+</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-brand-black mb-2 font-heading">
          Você é maior de 18 anos?
        </h2>

        <p className="text-sm text-zinc-600 leading-relaxed mb-6">
          Este site comercializa bebidas alcoólicas destinadas exclusivamente para maiores de 18 anos, em conformidade com a legislação brasileira.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={confirmAge}
            className="w-full py-3.5 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-extrabold text-sm sm:text-base transition-all duration-150 shadow-redGlow flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Sim, sou maior de 18 anos</span>
          </button>

          <button
            type="button"
            onClick={handleDeny}
            className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold text-sm transition-colors"
          >
            Não, sou menor de idade
          </button>
        </div>

      </div>
    </div>
  );
}
