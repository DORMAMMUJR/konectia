"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ className = "", isHero = false }: { className?: string, isHero?: boolean }) {
  const [search, setSearch] = useState("");

  if (isHero) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className={`bg-white rounded-md flex flex-col md:flex-row items-center border border-surface-container overflow-hidden shadow-sm ${className}`}
      >
        <div className="flex-1 w-full md:border-r border-surface-container flex items-center px-4 py-3 pb-3 md:pb-3 border-b md:border-b-0">
          <span className="material-symbols-outlined text-outline mr-2">search</span>
          <input
            className="w-full border-none focus:ring-0 text-on-surface bg-transparent text-sm sm:text-base outline-none"
            placeholder="¿Qué servicio necesitas?"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="w-full md:w-auto bg-tertiary text-white px-8 py-3.5 font-bold hover:bg-tertiary-container transition-colors active:scale-95 text-sm md:text-base tracking-wide">
          Buscar
        </button>
      </motion.div>
    );
  }

  // Navbar variant
  return (
    <div className={`flex flex-1 max-w-xl relative ${className}`}>
      <input 
        type="text" 
        placeholder="¿Qué servicio estás buscando hoy?" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-4 pr-12 py-2 bg-surface-container-low border border-surface-container rounded-md focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
      />
      <button className="absolute right-1 top-1 bottom-1 bg-primary text-white p-1 px-3 rounded hover:bg-secondary transition-colors">
        <span className="material-symbols-outlined text-[18px]">search</span>
      </button>
    </div>
  );
}
