import Image from "next/image";
import Link from "next/link";
import type { Professional } from "@/types";

export default function ProfessionalCard({ pro }: { pro: Professional }) {
  const isPremium = pro.verificationLevel === "premium";

  return (
    <div className="group bg-surface-container-lowest p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(45,188,254,0.15)] border border-transparent hover:border-secondary/20">
      <div className="flex gap-4 items-start mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={pro.avatarUrl}
            alt={pro.name}
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-md"
          />
          <div
            className={`absolute -bottom-2 -right-2 ${
              isPremium ? "bg-secondary" : "bg-surface-container-highest"
            } text-white rounded-full p-1 border-2 border-white`}
          >
            <span
              className={`material-symbols-outlined text-xs ${
                isPremium ? "text-white" : "text-on-surface-variant"
              }`}
              style={
                isPremium
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {isPremium ? "verified" : "verified_user"}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="font-[var(--font-headline)] font-bold text-primary text-base sm:text-lg truncate transition-colors group-hover:text-secondary">
              {pro.name}
            </h4>
            <div className="flex items-center gap-1 text-on-tertiary-container font-bold flex-shrink-0 ml-2">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-sm">{pro.rating}</span>
            </div>
          </div>
          <p
            className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
              isPremium ? "text-secondary" : "text-on-surface-variant"
            }`}
          >
            {pro.title} • {isPremium ? "Premium" : "Estándar"}
          </p>
          <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">
                task_alt
              </span>
              {pro.completedJobs} Trabajos
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">
                history
              </span>
              {pro.yearsExperience}a Exp.
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-on-surface-variant line-clamp-2 mb-5 sm:mb-6">
        {pro.specialty}. Servicio profesional con garantía y cumplimiento
        fiscal en toda tu zona.
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
        <Link
          href={`/perfil/${pro.id}`}
          className="flex-1 py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg text-sm transition-transform active:scale-95 text-center"
        >
          Ver Perfil
        </Link>
        <button className="flex-1 py-2 bg-primary text-on-primary font-bold rounded-lg text-sm transition-transform active:scale-95">
          Contratar Ahora
        </button>
      </div>
    </div>
  );
}
