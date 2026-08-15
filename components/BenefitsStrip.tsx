import React from "react";
import { Zap, Snowflake, CreditCard, Moon } from "lucide-react";

export default function BenefitsStrip() {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-brand-red" />,
      title: "Entrega em 15 Min",
      desc: "Motoboys dedicados na sua região",
    },
    {
      icon: <Snowflake className="w-6 h-6 text-brand-ice" />,
      title: "Bebida a -2°C",
      desc: "Câmara fria e bolsa térmica",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-brand-green" />,
      title: "Pix & Cartões",
      desc: "Pague no Pix ou na maquininha",
    },
    {
      icon: <Moon className="w-6 h-6 text-amber-500" />,
      title: "Plantão Noturno",
      desc: "Aberto até de madrugada",
    },
  ];

  return (
    <section className="bg-white border-b border-zinc-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-brand-black leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
