"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar Heineken, Gin Tanqueray, Whisky Red Label, Gelo, Petiscos..."
        className="w-full pl-11 pr-10 py-3 bg-white border-2 border-zinc-200 focus:border-brand-red rounded-xl font-semibold text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-150 shadow-sm focus:ring-4 focus:ring-red-100"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
          title="Limpar busca"
        >
          <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center">
            <X className="w-3.5 h-3.5" />
          </div>
        </button>
      )}
    </div>
  );
}
