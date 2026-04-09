"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [searchService, setSearchService] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <section className="relative min-h-[600px] lg:min-h-[870px] flex items-center overflow-hidden bg-primary-container">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-secondary" />
        <Image
          src="/images/hero-bg.png"
          alt="Hero background"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-0">
        {/* Left: Copy + Search */}
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6 leading-tight font-[var(--font-headline)]"
          >
            Servicios Profesionales de{" "}
            <span className="text-secondary-container">Confianza</span> en
            México
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-on-primary-container mb-8 lg:mb-10 max-w-xl"
          >
            La primera plataforma institucional que conecta expertos
            certificados con empresas y particulares bajo los más altos
            estándares de seguridad y cumplimiento.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="bg-surface-container-lowest/10 p-2 rounded-2xl lg:rounded-full glass-effect max-w-3xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full bg-white rounded-xl md:rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">
                  search
                </span>
                <input
                  className="w-full border-none focus:ring-0 focus:outline-none text-slate-900 font-medium bg-transparent text-sm sm:text-base"
                  placeholder="¿Qué servicio buscas? (ej. Abogado, Plomero)"
                  type="text"
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                />
              </div>
              <div className="flex-1 w-full bg-white rounded-xl md:rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">
                  location_on
                </span>
                <input
                  className="w-full border-none focus:ring-0 focus:outline-none text-slate-900 font-medium bg-transparent text-sm sm:text-base"
                  placeholder="¿En dónde?"
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <button className="w-full md:w-auto bg-secondary-container text-on-secondary-container px-6 sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-full font-bold hover:brightness-110 transition-all active:scale-95">
                Buscar
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Featured Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(8,28,54,0.12)] border border-white/20 relative">
            <div className="absolute -top-4 -right-4 bg-tertiary-container text-on-tertiary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Proveedor Destacado
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/featured-provider.png"
                alt="Proveedor Destacado"
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-primary font-[var(--font-headline)]">
                  Lic. Ana Gabriela Ruiz
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Consultoría Fiscal &amp; SAT
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="material-symbols-outlined text-secondary-container text-sm"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    stars
                  </span>
                  <span className="text-xs font-bold text-primary">
                    4.9 (124 reseñas)
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary-container">
                  verified_user
                </span>
                <span>Validación Biométrica OK</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary-container">
                  shield
                </span>
                <span>Escrow Garantizado</span>
              </div>
            </div>
            <button className="w-full py-3 border-2 border-secondary-container text-secondary-container font-bold rounded-xl hover:bg-secondary-container hover:text-white transition-all active:scale-95">
              Ver Perfil Institucional
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
