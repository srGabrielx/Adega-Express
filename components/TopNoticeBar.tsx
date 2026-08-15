import React from "react";
import { Zap } from "lucide-react";

export default function TopNoticeBar() {
  return (
    <aside aria-label="Aviso de Entrega Rápida" className="bg-brand-black text-white px-3 py-1.5 text-xs sm:text-sm font-bold border-b-2 border-brand-red w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
        <span className="inline-flex items-center gap-1 bg-brand-red text-white text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 animate-pulse">
          <Zap className="w-3 h-3 fill-current" /> FLASH 15 MIN
        </span>
        <span className="text-zinc-200">
          ENTREGA EXPRESS: Peça agora e receba <strong className="text-brand-iceVibrant font-extrabold">TRINCANDO A -2°C</strong> em até 15 minutos!
        </span>
      </div>
    </aside>
  );
}
