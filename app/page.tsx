"use client";

import React, { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import BenefitsStrip from "@/components/BenefitsStrip";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "todos" || product.category === selectedCategory;
      const matchesSearch =
        searchTerm.trim() === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      const yOffset = -70;
      const y = catalogEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("todos");
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col flex-1">
      {/* SEÇÃO HERO */}
      <HeroSection />

      {/* FAIXA DE BENEFÍCIOS */}
      <BenefitsStrip />

      {/* SEÇÃO DO CATÁLOGO DE PRODUTOS */}
      <section id="catalog-section" className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* BARRA DE PESQUISA EM TEMPO REAL */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
          />

          {/* FILTRO DE CATEGORIAS STICKY */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* GRADE DE PRODUTOS & PRATELEIRAS */}
          <ProductGrid
            products={filteredProducts}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            onSelectCategory={handleSelectCategory}
            onResetFilters={handleResetFilters}
          />

        </div>
      </section>
    </div>
  );
}
