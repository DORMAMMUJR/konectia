"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setRole } = useAuthStore();
  const router = useRouter();

  const handleDemoLogin = (role: "client" | "professional") => {
    setRole(role);
    router.push(role === "client" ? "/dashboard/cliente" : "/dashboard/profesional");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(8,28,54,0.08)]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/images/logo.png"
              alt="KonectIA Logo"
              width={48}
              height={48}
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h2 className="text-2xl font-bold text-primary font-[var(--font-headline)]">
            Bienvenido de nuevo
          </h2>
          <p className="text-sm text-on-surface-variant mt-2">
            Inicia sesión para continuar en KonectIA.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
          </div>
          <div className="flex items-center justify-between">
             <label className="flex items-center gap-2 text-sm text-on-surface-variant">
               <input type="checkbox" className="rounded text-secondary focus:ring-secondary" />
               Recordarme
             </label>
             <Link href="#" className="flex-1 text-right text-xs font-bold text-secondary hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>
        </div>

        {/* Demo Buttons */}
        <div className="mt-8 space-y-3">
           <button 
            onClick={() => handleDemoLogin("client")}
            className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md"
           >
             <span className="material-symbols-outlined text-[18px]">login</span>
             Iniciar como Cliente (Demo)
           </button>
           <button 
            onClick={() => handleDemoLogin("professional")}
            className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-all hover:text-white active:scale-95 shadow-md"
           >
             <span className="material-symbols-outlined text-[18px]">engineering</span>
             Iniciar como Profesional (Demo)
           </button>
        </div>

        <p className="text-center mt-8 text-sm text-on-surface-variant flex gap-1 justify-center">
          ¿No tienes una cuenta? 
          <Link href="/registro" className="font-bold text-secondary hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
