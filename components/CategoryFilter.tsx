"use client";

import React from "react";
import { CATEGORIES } from "@/data/products";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="sticky top-16 z-30 bg-zinc-50/95 backdrop-blur-md border-b border-zinc-200/90 py-2.5 -mx-4 sm:-mx-6 px-4 sm:px-6 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 shrink-0 select-none cursor-pointer border ${
                isActive
                  ? "bg-brand-red text-white border-brand-red shadow-redGlow scale-[1.02]"
                  : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 shadow-sm"
              }`}
            >
              <span className="text-base leading-none">{cat.icon}</span>
              <span>{cat.name}</span>
              {cat.tag && !isActive && (
                <span className="hidden md:inline-block text-[10px] font-bold bg-brand-iceLight text-brand-ice px-1.5 py-0.5 rounded-full">
                  {cat.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
