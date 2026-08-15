import React from "react";
import { STORE_CONFIG } from "@/data/config";
import { Phone, MapPin, Clock, ShieldCheck, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-12 pb-8 border-t-4 border-brand-red mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-zinc-800">
          
          {/* SOBRE A LOJA */}
          <div className="space-y-3">
            <h3 className="text-xl font-black tracking-tight font-heading text-white">
              ADEGA <span className="text-brand-red">{STORE_CONFIG.brandAccent}</span>
            </h3>
            <p className="text-xs font-bold text-red-200">
              {STORE_CONFIG.tagline}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              O seu delivery express de bebidas favorito com atendimento ultrarrápido e entrega de cervejas estalando a -2°C em Marabá - PA.
            </p>
          </div>

          {/* ATENDIMENTO & PEDIDOS */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-zinc-200 border-b border-zinc-800 pb-2">
              Atendimento & Contato
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <span>WhatsApp: <strong className="text-white">{STORE_CONFIG.phoneFormatted}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-ice shrink-0" />
                <span>Endereço: <strong className="text-white">{STORE_CONFIG.address}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Instagram: <strong className="text-white">{STORE_CONFIG.instagram}</strong></span>
              </li>
            </ul>
          </div>

          {/* HORÁRIOS */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-zinc-200 border-b border-zinc-800 pb-2">
              Horários de Funcionamento
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.status.openingHoursText}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-950/80 border border-green-700 text-green-400 rounded-full font-bold text-[11px] mt-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span>Plantão Ativo • Entrega em 15 a 20 min</span>
              </div>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <div>
            © {currentYear} {STORE_CONFIG.name}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Delivery Express • Bebidas Geladas a -2°C</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
