"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const navLinks = [
  { label: "Directorio", href: "/buscar", active: true },
  { label: "Categorías", href: "/categorias", active: false },
  { label: "Centro de Confianza", href: "#trust", active: false },
];

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentRole, logout, currentUser } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        {/* Logo & Links */}
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="KonectIA Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold tracking-tighter text-slate-900 font-[var(--font-headline)]">
              KonectIA
            </span>
          </Link>

          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.active
                    ? "text-cyan-600 font-semibold border-b-2 border-cyan-600 pb-1"
                    : "text-slate-600 hover:text-cyan-600 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-4 mr-2">
            <button className="hover:text-cyan-600 transition-all p-1">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="hover:text-cyan-600 transition-all p-1">
              <span className="material-symbols-outlined">chat_bubble</span>
            </button>
          </div>

          {isClient && currentRole === "guest" ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="text-primary font-bold text-sm px-4 py-2 hover:bg-surface-container rounded-xl transition-all"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="bg-primary hover:bg-primary-container text-on-primary px-4 sm:px-5 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-md"
              >
                Regístrate
              </Link>
            </div>
          ) : isClient ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href={currentRole === "client" ? "/dashboard/cliente" : "/dashboard/profesional"}
                className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-xl font-bold text-sm hover:bg-secondary hover:text-white transition-all shadow-sm"
              >
                Mi Panel
              </Link>
              <button
                onClick={logout}
                className="text-on-surface-variant hover:text-error px-2 py-2 rounded-xl transition-all"
                title="Cerrar Sesión"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : null}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 hover:text-cyan-600 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 animate-[fadeIn_0.2s_ease]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-slate-600 hover:text-cyan-600 transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
            {isClient && currentRole === "guest" ? (
              <>
                <Link href="/login" className="w-full text-center py-2 text-primary font-bold bg-surface-container-low rounded-xl">Ingresar</Link>
                <Link href="/registro" className="w-full text-center py-2 bg-primary text-on-primary font-bold rounded-xl shadow-md">Regístrate</Link>
              </>
            ) : isClient ? (
              <>
                <Link href={currentRole === "client" ? "/dashboard/cliente" : "/dashboard/profesional"} className="w-full text-center py-2 bg-secondary-container text-on-secondary-container font-bold rounded-xl">Mi Panel</Link>
                <button onClick={logout} className="w-full text-center py-2 text-error font-bold bg-error-container/20 rounded-xl">Cerrar Sesión</button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
