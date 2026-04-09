import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export const metadata = {
  title: "Verificación de Identidad | KonectIA",
};

export default function VerificacionPage() {
  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-surface-container py-12 px-4 sm:px-6 pt-[100px]">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="bg-secondary-container/20 text-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Paso 2 de 3
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-[var(--font-headline)] text-primary mb-3">
              Verificación Institucional
            </h1>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Para garantizar la seguridad de nuestra comunidad, todos los profesionales deben validar su identidad y situación fiscal ante el SAT.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_20px_40px_rgba(8,28,54,0.04)] mb-8">
             <div className="space-y-10">
               {/* Step 1: Biometría */}
               <div className="relative">
                  <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-surface-container -z-10 hidden sm:block"></div>
                  <div className="flex gap-4 sm:gap-6 items-start">
                    <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 z-10 shadow-md">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary font-[var(--font-headline)] mb-2">Identidad Biométrica</h3>
                      <p className="text-sm text-on-surface-variant mb-6">Sube una foto de tu INE/Pasaporte y tómate una selfie. Nuestro sistema lo validará en tiempo real.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                          <span className="material-symbols-outlined text-4xl text-outline mb-3 group-hover:text-secondary transition-colors">badge</span>
                          <span className="text-sm font-bold text-primary">Subir Identificación</span>
                          <span className="text-xs text-on-surface-variant mt-1">Frente y Reverso</span>
                        </div>
                        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                          <span className="material-symbols-outlined text-4xl text-secondary mb-3">face</span>
                          <span className="text-sm font-bold text-primary mb-3">Autenticación Facial</span>
                          <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold w-full hover:bg-primary-container transition-colors">
                            Abrir Cámara
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Step 2: SAT */}
               <div className="relative">
                  <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-surface-container -z-10 hidden sm:block"></div>
                  <div className="flex gap-4 sm:gap-6 items-start">
                    <div className="w-12 h-12 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 z-10">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary font-[var(--font-headline)] mb-2">Constancia de Situación Fiscal</h3>
                      <p className="text-sm text-on-surface-variant mb-6">Sube tu CSF actualizada (no mayor a 3 meses) en formato PDF para validar tu régimen ante el SAT.</p>
                      
                      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                           <span className="material-symbols-outlined text-3xl text-error">picture_as_pdf</span>
                           <div>
                             <p className="font-bold text-sm text-on-surface">Subir documento PDF</p>
                             <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Máx 5MB</p>
                           </div>
                        </div>
                        <button className="bg-white border border-outline-variant/30 text-primary px-4 py-2 rounded-lg text-xs font-bold hover:bg-surface-container transition-colors">
                          Explorar
                        </button>
                      </div>
                    </div>
                  </div>
               </div>

                {/* Step 3: CONOCER */}
               <div className="relative">
                  <div className="flex gap-4 sm:gap-6 items-start">
                    <div className="w-12 h-12 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 z-10">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary font-[var(--font-headline)] mb-2 flex flex-wrap items-center gap-2">
                        Certificación CONOCER / SEP
                        <span className="bg-surface-container-high text-[10px] uppercase px-2 py-0.5 rounded tracking-widest">Opcional</span>
                      </h3>
                      <p className="text-sm text-on-surface-variant mb-6">Obtén la insignia Premium subiendo tu folio de certificación vigente.</p>
                      
                      <div className="relative">
                        <input type="text" placeholder="Ingresa tu folio de certificación (Ej. CONOCER-9821)" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary transition-all font-mono" />
                      </div>
                    </div>
                  </div>
               </div>
             </div>
             
             {/* Action */}
             <div className="mt-10 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
               <span className="flex items-center gap-2 text-xs text-on-surface-variant">
                 <span className="material-symbols-outlined text-[16px]">lock</span>
                 Tus datos están encriptados
               </span>
               <button className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-container active:scale-95 transition-all shadow-lg text-sm">
                 Completar Verificación
               </button>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
