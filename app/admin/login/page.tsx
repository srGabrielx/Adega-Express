"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth");
    if (isAuth === "true") {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network request
    setTimeout(() => {
      if (email === "admin@adega.com" && password === "admin123") {
        sessionStorage.setItem("admin_auth", "true");
        router.push("/admin");
      } else {
        setError("E-mail ou senha incorretos.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-200">
        
        {/* Header */}
        <div className="bg-brand-black p-8 text-center border-b-4 border-brand-red relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-zinc-900 rounded-2xl p-1 border border-zinc-800 shadow-lg">
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white font-heading tracking-tight">
            Adega Express
          </h1>
          <p className="text-zinc-400 text-sm font-bold mt-1">
            Painel Administrativo
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-extrabold text-zinc-700 block">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-xl bg-zinc-50 text-brand-black placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all font-medium"
                  placeholder="admin@adega.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-extrabold text-zinc-700 block">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-xl bg-zinc-50 text-brand-black placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-brand-red hover:bg-brand-redHover text-white rounded-xl font-black text-sm transition-all shadow-redGlow active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-zinc-50 p-4 text-center border-t border-zinc-100">
          <p className="text-xs text-zinc-500 font-medium">
            Área restrita para administradores autorizados.
          </p>
        </div>
      </div>
    </div>
  );
}
