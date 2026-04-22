import TopNav from "@/components/layout/TopNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/services/projects";
import { getPayments } from "@/services/payments";
import ProjectProgressUpdater from "@/components/dashboard/ProjectProgressUpdater";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Panel de Profesional | INTECNIA Pro",
};

export default async function ProfessionalDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = session.user.id;
  const userName = session.user.name?.split(" ")[0] || "Profesional";

  const projects = await getProjects(userId);
  const payments = await getPayments(userId);

  return (
    <>
      <TopNav />
      <div className="flex pt-[72px] min-h-screen bg-surface">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2 font-[var(--font-headline)] flex items-center gap-2">
              Panel Profesional
              <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] sm:text-xs px-2 py-1 flex items-center rounded uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-[14px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Premium
              </span>
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base">
              Hola, {userName}. Tienes 1 nuevo mensaje y 3 nuevas solicitudes en tu zona.
            </p>
          </div>
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
             <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/10">
               <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Ingresos Mes</p>
               <h3 className="text-2xl font-bold font-[var(--font-headline)] text-primary">$42,500 <span className="text-sm font-normal">MXN</span></h3>
               <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">trending_up</span> +12% vs mes ant.</p>
             </div>
             <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/10">
               <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">En Custodia</p>
               <h3 className="text-2xl font-bold font-[var(--font-headline)] text-primary">$8,500 <span className="text-sm font-normal">MXN</span></h3>
               <p className="text-xs text-orange-500 font-semibold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">lock_clock</span> 1 pago pendiente</p>
             </div>
             <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/10">
               <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Calificación</p>
               <h3 className="text-2xl font-bold font-[var(--font-headline)] text-primary flex items-center gap-1">4.9 <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span></h3>
               <p className="text-xs text-on-surface-variant font-semibold mt-2">142 reseñas totales</p>
             </div>
             <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/10 relative overflow-hidden group hover:border-secondary transition-colors cursor-pointer block">
               <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Perfil Público</p>
               <h3 className="text-2xl font-bold font-[var(--font-headline)] text-primary">2.4k <span className="text-sm font-normal text-on-surface-variant">vistas</span></h3>
               <Link href="/perfil/pro-001" className="text-xs text-secondary font-bold mt-2 flex items-center gap-1 group-hover:underline">Ir a mi perfil <span className="material-symbols-outlined text-[14px]">arrow_forward</span></Link>
               <div className="absolute -right-4 -bottom-4 opacity-5">
                 <span className="material-symbols-outlined text-[100px]">visibility</span>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              {/* Active Taks Widget */}
              <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-[var(--font-headline)] text-primary">
                    Trabajos en Curso
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-surface-container text-xs uppercase tracking-wider text-on-surface-variant">
                        <th className="font-bold py-3 pr-4">Proyecto</th>
                        <th className="font-bold py-3 px-4">Cliente</th>
                        <th className="font-bold py-3 px-4">Pago (MXN)</th>
                        <th className="font-bold py-3 px-4 w-32">Progreso</th>
                        <th className="font-bold py-3 pl-4 text-right">Estatus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-surface-container-low hover:bg-surface-container-lowest transition-colors">
                          <td className="py-4 pr-4">
                            <p className="font-bold text-on-surface text-sm">{project.title}</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">Ref: {project.id}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-start items-center gap-2">
                               <Image src="/images/featured-provider.png" alt="Cliente" width={24} height={24} className="w-6 h-6 rounded-full grayscale" />
                               <span className="text-sm">Cliente Seguro</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-sm">
                            $1,650
                          </td>
                          <td className="py-4 px-4 align-top">
                            <ProjectProgressUpdater 
                              projectId={project.id} 
                              currentProgress={project.progress} 
                            />
                          </td>
                          <td className="py-4 pl-4 text-right align-top">
                             <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                               {project.status === 'completed' ? 'Completado' : 'En Curso'}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              {/* Verification Status */}
              <section className="bg-primary-container text-on-primary-container rounded-2xl p-5 sm:p-6 shadow-sm">
                 <h2 className="text-lg font-bold font-[var(--font-headline)] text-white mb-4">
                   Cumplimiento Fiscal y Legal
                 </h2>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                       <div>
                         <p className="text-sm font-bold text-white">RFC Validado (SAT)</p>
                         <p className="text-[10px] opacity-70 uppercase tracking-widest">Vigente</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                       <div>
                         <p className="text-sm font-bold text-white">Biometría</p>
                         <p className="text-[10px] opacity-70 uppercase tracking-widest">Nivel Alto</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-orange-400" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                       <div>
                         <p className="text-sm font-bold text-white">Certificado CONOCER</p>
                         <p className="text-[10px] text-orange-300 uppercase tracking-widest">Por expirar en 30 días</p>
                       </div>
                    </div>
                 </div>
                 <Link href="/registro/verificacion" className="mt-6 w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-colors block text-center">
                   Actualizar Documentos
                 </Link>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
