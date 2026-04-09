import TopNav from "@/components/layout/TopNav";
import ClientDashboardSidebar from "@/components/layout/ClientDashboardSidebar";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/services/projects";
import { getPayments } from "@/services/payments";

export const metadata = {
  title: "Panel de Cliente | KonectIA",
};

export default async function ClientDashboardPage() {
  const projects = await getProjects();
  const payments = await getPayments();

  return (
    <>
      <TopNav />
      <div className="flex pt-[72px] min-h-screen bg-surface">
        <ClientDashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2 font-[var(--font-headline)]">
              Bienvenido, Carlos
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Aquí puedes gestionar tus proyectos activos, pagos en Escrow y facturas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              {/* Active Projects Widget */}
              <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-[var(--font-headline)] text-primary">
                    Proyectos Activos
                  </h2>
                  <Link href="/dashboard/cliente/proyectos" className="text-secondary text-sm font-bold hover:underline">
                    Ver todos
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {projects.filter(p => p.status === "active").map((project) => (
                    <div key={project.id} className="border border-outline-variant/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center hover:bg-surface-container-lowest transition-colors">
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                        <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 w-full">
                        <h3 className="font-bold text-on-surface">{project.title}</h3>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1 mb-3">
                          <span className="material-symbols-outlined text-[14px]">engineering</span>
                          {project.professional.name}
                        </p>
                        
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-[10px] sm:text-xs font-bold text-on-surface mb-1">
                            <span>Progreso Estimado</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-surface-container rounded-full h-2">
                            <div className="bg-secondary-container h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <Link href={`/mensajes?p=${project.id}`} className="flex-1 sm:flex-none text-center px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs rounded-lg transition-colors border border-outline-variant/20">
                          Mensaje
                        </Link>
                        <button className="flex-1 sm:flex-none text-center px-4 py-2 bg-primary text-on-primary font-semibold text-xs rounded-lg active:scale-95 transition-transform">
                          Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Escrow Promo */}
              <section className="bg-gradient-to-r from-primary to-primary-container rounded-2xl p-6 sm:p-8 shadow-md text-white relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10">
                  <span className="material-symbols-outlined text-[150px]">verified_user</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold font-[var(--font-headline)] mb-2">Tu dinero está seguro</h3>
                  <p className="text-on-primary-container text-sm max-w-md leading-relaxed mb-6">
                    Los fondos depositados en nuestras cuentas de custodia (Escrow) solo son liberados cuando tú apruebas formalmente la entrega final del proyecto.
                  </p>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-xl font-bold text-sm transition-colors border border-white/20">
                    Leer más sobre la protección KonectIA
                  </button>
                </div>
              </section>
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              {/* Payment History Widget */}
              <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-[var(--font-headline)] text-primary">
                    Últimas Transacciones
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {payments.map(payment => (
                    <div key={payment.id} className="flex gap-4 items-center p-3 hover:bg-surface-container-lowest rounded-xl transition-colors border border-transparent hover:border-outline-variant/10 cursor-pointer">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${payment.status === 'received' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface-variant'}`}>
                        <span className="material-symbols-outlined text-[20px]">
                          {payment.status === 'received' ? 'receipt_long' : 'hourglass_empty'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-on-surface truncate">{payment.description}</p>
                        <p className="text-[10px] text-on-surface-variant">{payment.date} • {payment.transactionId}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-primary text-sm">${payment.amount.toLocaleString()}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${payment.status === 'received' ? 'text-green-600' : 'text-orange-500'}`}>
                          {payment.status === 'received' ? 'CFDI Listo' : 'En Custodia'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2.5 text-xs font-bold text-secondary-container hover:bg-secondary-container/5 rounded-xl transition-colors">
                  Ver Historial Completo y Descargar Descargar CFDI
                </button>
              </section>
              
              {/* Quick Actions */}
              <section className="grid grid-cols-2 gap-4">
                 <Link href="/buscar" className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center gap-2 group">
                   <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center group-hover:bg-secondary-container group-hover:text-white transition-colors text-secondary cursor-pointer">
                     <span className="material-symbols-outlined">search</span>
                   </div>
                   <span className="text-xs font-bold text-on-surface">Explorar Directorio</span>
                 </Link>
                 <Link href="/mensajes" className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center gap-2 group">
                   <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center group-hover:bg-secondary-container group-hover:text-white transition-colors text-secondary cursor-pointer">
                     <span className="material-symbols-outlined text-[20px] relative">
                       forum
                       <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                     </span>
                   </div>
                   <span className="text-xs font-bold text-on-surface">Bandeja de Entrada</span>
                 </Link>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
