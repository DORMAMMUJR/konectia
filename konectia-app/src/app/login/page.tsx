"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setServerError("Credenciales inválidas. Verifica tu correo y contraseña.");
      return;
    }

    router.push("/dashboard/cliente");
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
            Bienvenido de nuevo
          </h2>
          <p className="text-sm text-on-surface-variant mt-2">
            Inicia sesión para continuar en INTECNIA.
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-error-container/20 border border-error/30 rounded-xl text-sm text-error font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex items-center justify-between">
             <label className="flex items-center gap-2 text-sm text-on-surface-variant">
               <input type="checkbox" className="rounded text-secondary focus:ring-secondary" />
               Recordarme
             </label>
             <Link href="#" className="flex-1 text-right text-xs font-bold text-secondary hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                Iniciando sesión...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">login</span>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <div className="flex-1 border-t border-outline-variant/30"></div>
          <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">O continúa con</span>
          <div className="flex-1 border-t border-outline-variant/30"></div>
        </div>

        <button
          onClick={() => {
            setIsLoading(true);
            signIn("google", { callbackUrl: "/dashboard/cliente" });
          }}
          disabled={isLoading}
          className="mt-6 w-full bg-white border border-outline-variant/50 text-on-surface py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-surface-container-low transition-all active:scale-95 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
          Google
        </button>

        <p className="text-center mt-8 text-sm text-on-surface-variant flex gap-1 justify-center">
          ¿No tienes una cuenta? 
          <Link href="/registro" className="font-bold text-secondary hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
