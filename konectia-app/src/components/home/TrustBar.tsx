import type { TrustIndicator } from "@/types";

const trustItems: TrustIndicator[] = [
  { icon: "fingerprint", label: "Validación Biométrica", sublabel: "Seguridad" },
  { icon: "payments", label: "Pagos en Custodia (Escrow)", sublabel: "Protección" },
  { icon: "gavel", label: "Cumplimiento SAT", sublabel: "Legalidad" },
  { icon: "workspace_premium", label: "Aval CONOCER/SEP", sublabel: "Certificación" },
];

export default function TrustBar() {
  return (
    <section className="bg-primary py-6 sm:py-8 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary-container">
                {item.icon}
              </span>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-tighter">
                {item.sublabel}
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
