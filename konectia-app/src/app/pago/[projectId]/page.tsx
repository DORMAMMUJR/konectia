import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/services/projects";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Pago en Custodia | INTECNIA Escrow",
};

export default async function PagoPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const projects = await getProjects();
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    // For mockup purposes, just use the first project if not found
    // notFound();
  }
  
  const activeProj = project || projects[0];

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-surface-container py-12 px-4 sm:px-6 pt-[100px]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-[var(--font-headline)] text-primary flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-4xl text-secondary">
                lock
              </span>
              Pago en Custodia (Escrow)
            </h1>
            <p className="text-on-surface-variant mt-2 text-sm sm:text-base">
              Transacción 100% protegida. Tu dinero solo se libera tras tu
              aprobación del trabajo terminado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold font-[var(--font-headline)] text-primary mb-6 border-b border-surface-container pb-4">
                  Resumen de la Orden
                </h2>
                
                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                     <Image src={activeProj.imageUrl} alt={activeProj.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface leading-snug">
                      {activeProj.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Profesional: {activeProj.professional.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Mano de Obra Especializada</span>
                    <span className="font-medium text-on-surface">$1,200.00 MXN</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Materiales y Refacciones</span>
                    <span className="font-medium text-on-surface">$450.00 MXN</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-medium text-on-surface">$1,650.00 MXN</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>IVA (16%)</span>
                    <span className="font-medium text-on-surface">$264.00 MXN</span>
                  </div>
                </div>

                <div className="border-t border-surface-container pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold font-[var(--font-headline)]">
                      Total a Pagar
                    </span>
                    <span className="text-2xl font-bold font-[var(--font-headline)] text-primary">
                      $1,914.00 <span className="text-sm font-normal">MXN</span>
                    </span>
                  </div>
                </div>

                {/* Satisfaction Guarantee Badge */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-4 items-start">
                   <div className="bg-green-100 p-2 rounded-full flex-shrink-0 text-green-700">
                     <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                       verified
                     </span>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-green-900 mb-1">Garantía de Satisfacción INTECNIA</p>
                     <p className="text-xs text-green-800 leading-relaxed">
                       Si el trabajo no se realiza según los términos acordados, el 100% de los fondos en Escrow serán devueltos a tu cuenta.
                     </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Right: Payment Method */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold font-[var(--font-headline)] text-primary mb-6 border-b border-surface-container pb-4">
                  Método de Pago
                </h2>

                {/* Payment Options */}
                <div className="space-y-3 mb-8">
                  <label className="flex items-center gap-4 p-4 border-2 border-secondary bg-secondary-fixed/20 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" className="text-secondary focus:ring-secondary w-5 h-5" defaultChecked />
                    <div className="flex-1">
                      <p className="font-bold text-on-surface text-sm">Tarjeta de Crédito / Débito</p>
                      <p className="text-xs text-on-surface-variant">Visa, MasterCard, Amex</p>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-3xl">credit_card</span>
                  </label>
                  
                  <label className="flex items-center gap-4 p-4 border border-surface-container rounded-xl cursor-pointer hover:bg-surface-container-lowest transition-colors">
                    <input type="radio" name="payment" className="text-secondary focus:ring-secondary w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-bold text-on-surface text-sm">Transferencia SPEI</p>
                      <p className="text-xs text-on-surface-variant">Referencia única en 24hs</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl">account_balance</span>
                  </label>
                </div>

                {/* Card Form Mockup */}
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Número de Tarjeta</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                      <span className="material-symbols-outlined absolute left-4 top-3 text-outline">credit_card</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Vencimiento</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">CVC</label>
                      <input type="password" placeholder="123" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Nombre en la tarjeta</label>
                    <input type="text" placeholder="Ej. Carlos Mendoza" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" />
                  </div>
                </div>

                <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold font-[var(--font-headline)] flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-xl shadow-primary/20">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  Depositar Seguro en Escrow
                </button>
                <p className="text-center text-xs text-on-surface-variant mt-4 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-xs">encrypted</span> Todos los datos están encriptados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
