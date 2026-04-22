import type { Quotation } from "@/types";
import Link from "next/link";

export default function QuotationCard({ quotation }: { quotation: Quotation }) {
  return (
    <div className="w-full max-w-md bg-white border border-outline-variant/30 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(8,28,54,0.08)]">
      <div className="bg-primary-container p-6 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <span className="material-symbols-outlined text-[100px]">
            description
          </span>
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-container/80 block mb-1">
            Propuesta de Servicio
          </span>
          <h3 className="text-xl font-bold font-[var(--font-headline)] leading-tight mb-4">
            {quotation.title}
          </h3>
          <div className="flex gap-4">
            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <span className="text-[10px] uppercase block opacity-60 font-medium">
                Duración
              </span>
              <span className="text-sm font-semibold">
                {quotation.duration}
              </span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <span className="text-[10px] uppercase block opacity-60 font-medium">
                Inicio
              </span>
              <span className="text-sm font-semibold">
                {quotation.startDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-3">
          {quotation.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">{item.label}</span>
              <span className="font-medium">
                ${item.amount.toLocaleString()} MXN
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Garantía</span>
            <span className="font-medium text-secondary">
              {quotation.warranty}
            </span>
          </div>

          <div className="h-px bg-outline-variant/30 my-2" />

          <div className="flex justify-between items-center">
            <span className="font-bold text-on-surface text-base">
              Total del Proyecto
            </span>
            <span className="text-2xl font-bold font-[var(--font-headline)] text-primary">
              ${quotation.total.toLocaleString()}{" "}
              <span className="text-xs font-normal">MXN</span>
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low p-3 rounded-xl flex gap-3 items-center">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield_with_heart
          </span>
          <p className="text-[10px] sm:text-[11px] leading-tight text-on-surface-variant">
            <span className="font-bold block mb-0.5 text-on-surface">
              Protección Escrow KonectIA
            </span>
            Tu pago se retiene de forma segura y solo se libera al profesional
            cuando confirmas que el trabajo está terminado satisfactoriamente.
          </p>
        </div>

        <Link
          href="/pago/proj-001"
          className="w-full block text-center py-3.5 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white font-bold rounded-xl transition-all shadow-lg active:scale-[0.98]"
        >
          Aceptar y Pagar
        </Link>
      </div>
    </div>
  );
}
