"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentRole, logout, currentUser } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-surface-container shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-8 py-3 max-w-[1440px] mx-auto gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Image
              src="/images/logo.png"
              alt="INTECNIA Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold tracking-tighter text-primary font-[var(--font-headline)]">
              INTECNIA
            </span>
          </Link>
          
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-1 text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Center: Search Bar (Hidden on mobile unless requested, but let's keep it clean on desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input 
            type="text" 
            placeholder="¿Qué servicio estás buscando hoy?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-2.5 bg-surface-container-low border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-primary text-white p-1.5 px-3 rounded-md hover:bg-secondary transition-colors">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4 text-sm font-semibold text-on-surface-variant">
            <Link href="/buscar" className="hover:text-tertiary transition-colors">Explorar</Link>
            <Link href="/categorias" className="hover:text-tertiary transition-colors">Categorías</Link>
          </div>

          <div className="h-6 w-px bg-surface-container"></div>

          {isClient && currentRole === "guest" ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-primary font-bold text-sm px-3 hover:text-tertiary transition-colors"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="font-bold text-sm px-3 hover:text-tertiary transition-colors mr-2"
              >
                Regístrate
              </Link>
              <Link href="/dashboard/publicar" className="bg-tertiary hover:bg-tertiary-container text-white px-5 py-2.5 rounded-md font-bold text-sm transition-transform active:scale-95 shadow-md">
                Publicar Servicio
              </Link>
            </div>
          ) : isClient ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard/publicar" className="bg-tertiary hover:bg-tertiary-container text-white px-5 py-2.5 rounded-md font-bold text-sm transition-transform active:scale-95 shadow-md">
                Publicar Servicio
              </Link>
              <Link
                href={currentRole === "client" ? "/dashboard/cliente" : "/dashboard/profesional"}
                className="font-bold text-sm text-primary hover:text-tertiary transition-colors"
              >
                Mi Panel
              </Link>
              <button
                onClick={logout}
                className="text-on-surface-variant hover:text-error transition-all"
                title="Cerrar Sesión"
              >
                <span className="material-symbols-outlined text-[24px]">logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-white border-t border-surface-container px-4 py-4 overflow-hidden"
        >
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Buscar servicio..." 
              className="w-full pl-4 pr-10 py-3 bg-surface-container-low border border-surface-container rounded-lg text-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          <div className="flex flex-col gap-3 font-semibold text-on-surface-variant mb-6">
            <Link href="/buscar" onClick={() => setMobileOpen(false)}>Explorar Servicios</Link>
            <Link href="/categorias" onClick={() => setMobileOpen(false)}>Categorías</Link>
          </div>

          <div className="flex flex-col gap-3">
            {isClient && currentRole === "guest" ? (
              <>
                <Link href="/login" className="w-full text-center py-3 text-primary border border-primary rounded-lg font-bold">Ingresar</Link>
                <Link href="/registro" className="w-full text-center py-3 bg-primary text-white rounded-lg font-bold">Regístrate</Link>
                <Link href="/dashboard/publicar" className="w-full text-center py-3 bg-tertiary text-white rounded-lg font-bold mt-2 shadow-md">Publicar Servicio</Link>
              </>
            ) : isClient ? (
              <>
                <Link href="/dashboard/publicar" className="w-full text-center py-3 bg-tertiary text-white rounded-lg font-bold shadow-md">Publicar Servicio</Link>
                <Link href={currentRole === "client" ? "/dashboard/cliente" : "/dashboard/profesional"} className="w-full text-center py-3 text-primary border border-primary font-bold rounded-lg mt-2">Mi Panel</Link>
                <button onClick={logout} className="w-full text-center py-3 text-error font-bold bg-error-container/20 rounded-lg mt-2">Cerrar Sesión</button>
              </>
            ) : null}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
