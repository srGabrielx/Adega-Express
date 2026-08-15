"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-brand-black text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-3 border border-zinc-700 animate-slide-up"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-brand-ice shrink-0" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-brand-red shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-bold truncate">
              {toast.message}
            </span>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-zinc-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
