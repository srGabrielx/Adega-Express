"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "@/data/config";
import { usePathname } from "next/navigation";

export default function WhatsAppFloating() {
  const pathname = usePathname();

  // Não exibe o botão flutuante no checkout para evitar distrações e sobreposição no formulário
  if (pathname === "/checkout") return null;

  return (
    <aside
      aria-label="Ações de Contato Rápido"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-30 pointer-events-auto"
    >
      <a
        href={`https://wa.me/${STORE_CONFIG.phone}?text=Ol%C3%A1%21+Gostaria+de+tirar+uma+d%C3%BAvida+sobre+as+bebidas.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 p-2.5 sm:px-4 sm:py-3 bg-brand-wa hover:bg-brand-waHover text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        title="Dúvidas no WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-6 sm:h-6 fill-current shrink-0" />
        <span className="hidden sm:inline-block text-xs font-black tracking-wide pr-1">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
