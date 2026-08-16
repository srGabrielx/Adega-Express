"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { CATEGORIES } from "@/data/products";
import { SearchX, ArrowRight } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchTerm: string;
  onSelectCategory: (categoryId: string) => void;
  onResetFilters: () => void;
}

export default function ProductGrid({
  products,
  selectedCategory,
  searchTerm,
  onSelectCategory,
  onResetFilters,
}: ProductGridProps) {
  // Se não encontrou nenhum produto
  if (products.length === 0) {
    return (
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-12 text-center my-8 shadow-sm">
        <div className="w-16 h-16 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-brand-black mb-2 font-heading">
          Nenhum produto encontrado
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
          Não encontramos bebidas ou petiscos correspondentes à sua busca &quot;{searchTerm}&quot;. Tente buscar por outro termo.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-black hover:bg-brand-red text-white rounded-xl font-bold text-sm transition-colors"
        >
          <span>Ver todos os produtos</span>
        </button>
      </div>
    );
  }

  // Visualização por Prateleiras quando em "Todos" e sem termo de busca
  if (selectedCategory === "todos" && !searchTerm) {
    const specificCategories = CATEGORIES.filter((c) => c.id !== "todos");

    return (
      <div className="space-y-10 py-4">
        {specificCategories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category.id
          );
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} id={`shelf-${category.id}`} className="space-y-4">
              
              {/* CABEÇALHO DA PRATELEIRA */}
              <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg sm:text-xl font-black text-brand-black font-heading tracking-tight">
                    {category.name}
                  </h2>
                  <span className="text-[11px] font-bold bg-brand-iceLight text-brand-ice px-2 py-0.5 rounded-full">
                    {categoryProducts.length} itens
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-brand-red hover:text-brand-redHover transition-colors cursor-pointer"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* GRADE DE PRODUTOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

            </section>
          );
        })}
      </div>
    );
  }

  // Visualização de Categoria Selecionada ou Resultado de Busca
  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <h2 className="text-lg sm:text-xl font-black text-brand-black font-heading">
          {searchTerm
            ? `Resultados para "${searchTerm}"`
            : CATEGORIES.find((c) => c.id === selectedCategory)?.name || "Produtos"}
        </h2>
        <span className="text-xs font-bold text-zinc-500">
          {products.length} {products.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
