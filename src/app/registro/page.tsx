"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegistroPage() {
  const router = useRouter();
  const { setRole } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<"client" | "professional">("client");

  const handleDemoRegister = () => {
    setRole(selectedRole);
    if (selectedRole === "professional") {
      // Professional registration leads to verification workflow
      router.push("/registro/verificacion");
    } else {
      router.push("/dashboard/cliente");
    }
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
            Crea tu cuenta
          </h2>
          <p className="text-sm text-on-surface-variant mt-2">
            Únete a la red de servicios más segura de México.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <button 
             onClick={() => setSelectedRole("client")}
             className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${selectedRole === "client" ? "border-secondary bg-secondary-fixed/20 text-primary" : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"}`}
           >
             <span className="material-symbols-outlined text-3xl mb-2" style={selectedRole === "client" ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
             <span className="text-sm font-bold">Cliente</span>
           </button>
           <button 
             onClick={() => setSelectedRole("professional")}
             className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${selectedRole === "professional" ? "border-secondary bg-secondary-fixed/20 text-primary" : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"}`}
           >
             <span className="material-symbols-outlined text-3xl mb-2" style={selectedRole === "professional" ? { fontVariationSettings: "'FILL' 1" } : {}}>engineering</span>
             <span className="text-sm font-bold">Profesional</span>
           </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
            />
          </div>
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
        </div>

        {/* Demo Buttons */}
         <button 
          onClick={handleDemoRegister}
          className="mt-8 w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md font-[var(--font-headline)]"
         >
           Comenzar Ahora (Demo)
         </button>

        <p className="text-center mt-6 text-sm text-on-surface-variant flex gap-1 justify-center">
          ¿Ya tienes cuenta? 
          <Link href="/login" className="font-bold text-secondary hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
