"use client";

import { useState } from "react";

export default function FilterSidebar() {
  const [category, setCategory] = useState("plumbing");

  return (
    <aside className="space-y-8 sticky top-28">
      <div className="bg-surface-container-low p-5 sm:p-6 rounded-xl space-y-6">
        <h3 className="font-[var(--font-headline)] font-semibold text-lg text-primary">
          Filtros
        </h3>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-3 uppercase tracking-wider">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-secondary text-sm py-2.5 px-3"
          >
            <option value="plumbing">Plomería y Tuberías</option>
            <option value="electric">Electricidad</option>
            <option value="hvac">Climatización</option>
            <option value="general">Reparación General</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-3 uppercase tracking-wider">
            Rango de Precios (MXN)
          </label>
          <input
            type="range"
            className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs mt-2 text-on-surface-variant">
            <span>$200</span>
            <span>$5,000+</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-3 uppercase tracking-wider">
            Calificación Mínima
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                className="text-secondary focus:ring-secondary"
                defaultChecked
              />
              <span className="text-sm group-hover:text-primary transition-colors">
                4.5+ Estrellas
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                className="text-secondary focus:ring-secondary"
              />
              <span className="text-sm group-hover:text-primary transition-colors">
                4.0+ Estrellas
              </span>
            </label>
          </div>
        </div>

        {/* Verification Level */}
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-3 uppercase tracking-wider">
            Nivel de Verificación
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-transparent hover:border-secondary/20 transition-all cursor-pointer">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="text-sm font-semibold">Premium</span>
              </div>
              <input
                type="checkbox"
                className="rounded text-secondary focus:ring-secondary"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-transparent hover:border-secondary/20 transition-all cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant">
                  verified_user
                </span>
                <span className="text-sm font-medium">Estándar</span>
              </div>
              <input
                type="checkbox"
                className="rounded text-secondary focus:ring-secondary"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-3 uppercase tracking-wider">
            Disponibilidad
          </label>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">
              Urgente
            </button>
            <button className="px-3 py-1 bg-surface-container-lowest text-on-surface-variant rounded-full text-xs font-medium border border-outline-variant/30">
              Hoy
            </button>
            <button className="px-3 py-1 bg-surface-container-lowest text-on-surface-variant rounded-full text-xs font-medium border border-outline-variant/30">
              Fin de semana
            </button>
          </div>
        </div>

        <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold mt-4 shadow-lg shadow-primary/10 active:scale-95 transition-transform">
          Aplicar Filtros
        </button>
      </div>
    </aside>
  );
}
