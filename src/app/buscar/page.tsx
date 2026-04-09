import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/search/FilterSidebar";
import ProfessionalCard from "@/components/search/ProfessionalCard";
import { getProfessionals } from "@/services/professionals";
import type { Professional } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Directorio de Servicios | KonectIA",
  description:
    "Encuentra profesionales verificados en tu zona. Plomeros, electricistas, consultores y más.",
};

export default async function BuscarPage() {
  const professionals = await getProfessionals();

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Breadcrumbs & Header */}
        <header className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-4 tracking-wider uppercase">
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <Link href="/buscar" className="hover:text-primary">
              Directorio
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-primary font-semibold">
              Resultados de Búsqueda
            </span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight font-[var(--font-headline)]">
                Profesionales verificados cerca de ti
              </h1>
              <p className="text-on-surface-variant mt-1">
                {professionals.length} profesionales verificados encontrados
              </p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg">
              <span className="material-symbols-outlined text-on-surface-variant">
                sort
              </span>
              <span className="text-sm font-medium">
                Ordenar por: Recomendados
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Filters — hidden on mobile, shown as sidebar on lg+ */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar />
          </div>

          {/* Results */}
          <section className="lg:col-span-9 space-y-6 sm:space-y-8">
            {/* Map Placeholder */}
            <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 bg-surface-container">
              <Image
                src="/images/hero-bg.png"
                alt="Mapa interactivo"
                fill
                className="object-cover opacity-60 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white/20">
                <span className="text-xs font-bold text-primary uppercase">
                  Vista de Mapa
                </span>
              </div>
              {/* Pulse marker */}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-secondary text-white p-2 rounded-full shadow-lg animate-pulse">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile filter trigger */}
            <div className="lg:hidden">
              <button className="w-full py-3 bg-surface-container-low text-primary rounded-xl font-semibold flex items-center justify-center gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-sm">tune</span>
                Filtros
              </button>
            </div>

            {/* Professional Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {professionals.map((pro: Professional) => (
                <ProfessionalCard key={pro.id} pro={pro} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-8">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-primary font-bold transition-all hover:bg-secondary hover:text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface-variant font-medium hover:bg-surface-container transition-all">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface-variant font-medium hover:bg-surface-container transition-all">
                3
              </button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface-variant font-medium hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined">
                  chevron_right
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
