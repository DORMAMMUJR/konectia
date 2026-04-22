"use client";

import Image from "next/image";
import SearchBar from "@/components/search/SearchBar";
import { motion } from "framer-motion";

export default function HeroSection() {
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
            Encuentra el <span className="text-tertiary">servicio perfecto</span> para tu negocio u hogar
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
          <SearchBar isHero={true} className="max-w-3xl" />
        </div>

        {/* Right: Featured Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5 hidden lg:block"
        >
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(8,28,54,0.12)] border border-white/20 relative">
            <div className="absolute -top-4 -right-4 bg-tertiary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Top Rated
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/featured-provider.png"
                alt="Proveedor Destacado"
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-surface-container"
              />
              <div>
                <h3 className="text-lg font-bold text-primary font-[var(--font-headline)]">
                  Lic. Ana Gabriela Ruiz
                </h3>
                <p className="text-sm text-on-surface-variant font-medium">
                  Consultoría Fiscal &amp; SAT
                </p>
                <div className="flex items-center gap-1 mt-1 text-tertiary">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    4.9 (124 reseñas)
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant italic mb-4 border-l-2 border-surface-container pl-3">
              "Excelente servicio, me ayudó a regularizar mi PYME en tiempo récord."
            </p>
            <button className="w-full py-3 border border-surface-container text-on-surface font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95">
              Ver Perfil
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
