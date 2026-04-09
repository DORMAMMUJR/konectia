import TopNav from "@/components/layout/TopNav";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getRequests } from "@/services/requests";
import Image from "next/image";
import Link from "next/link";
import type { ServiceRequest } from "@/types";

export const metadata = {
  title: "Muro de Solicitudes | KonectIA Pro",
};

export default async function SolicitudesPage() {
  const requests = await getRequests();

  return (
    <>
      <TopNav />
      <div className="flex pt-[72px] min-h-screen bg-surface">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 font-[var(--font-headline)]">
                Muro de Solicitudes
              </h1>
              <p className="text-on-surface-variant text-lg">
                Explora nuevas oportunidades y expande tu red profesional.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-6 py-2 bg-surface-container-highest text-on-surface rounded-full font-semibold text-sm hover:bg-surface-dim transition-colors">
                <span className="material-symbols-outlined text-sm">tune</span>
                Filtros
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-full font-semibold text-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-sm">sort</span>
                Más Recientes
              </button>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-5 py-2 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-sm cursor-pointer shadow-sm">
              Todas
            </span>
            <span className="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
              Plomería
            </span>
            <span className="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
              Mascotas
            </span>
            <span className="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
              Educación
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req: ServiceRequest) => (
              <div
                key={req.id}
                className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(8,28,54,0.06)] hover:-translate-y-1 transition-all flex flex-col border border-white/50"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={req.client.avatarUrl}
                      alt={req.client.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover bg-surface-container"
                    />
                    <div>
                      <p className="font-bold text-primary text-sm leading-tight">
                        {req.client.name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">
                          location_on
                        </span>
                        {req.location}
                      </p>
                    </div>
                  </div>
                  {req.urgency === "urgent" && (
                    <span className="bg-secondary-container/10 text-secondary font-bold text-[10px] px-2 py-1 rounded tracking-tighter uppercase">
                      Urgente
                    </span>
                  )}
                  {req.urgency === "new" && (
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] px-2 py-1 rounded tracking-tighter uppercase">
                      Nuevo
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-primary mb-3 leading-snug">
                  {req.title}
                </h3>
                <p className="text-on-surface-variant text-sm mb-6 flex-1 line-clamp-3">
                  {req.description}
                </p>

                <div className="pt-4 border-t border-outline-variant/20 mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                        Presupuesto Estimado
                      </p>
                      <p className="text-lg font-extrabold text-primary">
                        ${req.budgetMin}{" "}
                        {req.budgetMax > req.budgetMin && `- $${req.budgetMax}`} MXN{" "}
                        {req.budgetUnit === "hourly" ? "/ hr" : req.budgetUnit === "daily" ? "/ día" : ""}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant/40 text-3xl">
                      {req.categoryIcon}
                    </span>
                  </div>
                  <Link
                    href={`/mensajes?solicitud=${req.id}`}
                    className="w-full block text-center bg-primary text-on-primary py-3 rounded-xl font-bold hover:shadow-lg active:scale-95 transition-all text-sm"
                  >
                    Enviar Propuesta
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
