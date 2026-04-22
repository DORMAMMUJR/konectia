"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { registerUser } from "@/app/actions/auth";

export default function RegistroPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "client" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError("");

    const result = await registerUser(data);

    if (result.error) {
      setServerError(result.error);
      setIsLoading(false);
      return;
    }

    // Auto sign-in after registration
    const signInResult = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (signInResult?.error) {
      setServerError("Cuenta creada, pero hubo un error al iniciar sesión. Intenta desde la página de login.");
      return;
    }

    if (data.role === "professional") {
      router.push("/registro/verificacion");
    } else {
      router.push("/dashboard/cliente");
    }
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(8,28,54,0.08)]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/images/logo.png"
              alt="INTECNIA Logo"
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

        {serverError && (
          <div className="mb-4 p-3 bg-error-container/20 border border-error/30 rounded-xl text-sm text-error font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {serverError}
          </div>
        )}

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <button 
             type="button"
             onClick={() => setValue("role", "client")}
             className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${selectedRole === "client" ? "border-secondary bg-secondary-fixed/20 text-primary" : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"}`}
           >
             <span className="material-symbols-outlined text-3xl mb-2" style={selectedRole === "client" ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
             <span className="text-sm font-bold">Cliente</span>
           </button>
           <button 
             type="button"
             onClick={() => setValue("role", "professional")}
             className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all ${selectedRole === "professional" ? "border-secondary bg-secondary-fixed/20 text-primary" : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"}`}
           >
             <span className="material-symbols-outlined text-3xl mb-2" style={selectedRole === "professional" ? { fontVariationSettings: "'FILL' 1" } : {}}>engineering</span>
             <span className="text-sm font-bold">Profesional</span>
           </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              {...register("name")}
              className={`w-full bg-surface-container-lowest border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all ${
                errors.name ? "border-error" : "border-outline-variant/50"
              }`}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              {...register("email")}
              className={`w-full bg-surface-container-lowest border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all ${
                errors.email ? "border-error" : "border-outline-variant/50"
              }`}
            />
            {errors.email && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full bg-surface-container-lowest border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all ${
                errors.password ? "border-error" : "border-outline-variant/50"
              }`}
            />
            {errors.password && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                {errors.password.message}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md font-[var(--font-headline)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                Creando cuenta...
              </>
            ) : (
              "Comenzar Ahora"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-on-surface-variant flex gap-1 justify-center">
          ¿Ya tienes cuenta? 
          <Link href="/login" className="font-bold text-secondary hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
