import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { getCategories } from "@/services/categories";
import type { Category } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "Categorías Profesionales | INTECNIA",
  description:
    "Explora todas las categorías de servicios profesionales verificados disponibles en INTECNIA.",
};

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 lg:mb-16">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-4 tracking-wider uppercase">
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-primary font-semibold">Categorías</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tighter mb-4 font-[var(--font-headline)]">
            Categorías Profesionales
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl">
            Encuentra al experto perfecto para tu proyecto. Todos nuestros
            profesionales están verificados por nuestro comité de calidad
            institucional.
          </p>
        </header>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {categories.map((cat: Category) => (
            <Link
              key={cat.id}
              href="/buscar"
              className="group bg-surface-container-lowest p-8 sm:p-10 rounded-2xl hover:shadow-[0_20px_40px_rgba(8,28,54,0.08)] transition-all border border-transparent hover:border-secondary/10 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-full -mr-10 -mt-10 group-hover:bg-secondary-container/10 transition-colors" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-white transition-colors">
                    {cat.icon}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3 font-[var(--font-headline)]">
                  {cat.name}
                </h2>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    {cat.expertCount.toLocaleString()} Expertos
                  </span>
                  <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-surface-container-low rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4 font-[var(--font-headline)]">
            ¿No encuentras tu categoría?
          </h3>
          <p className="text-on-surface-variant max-w-md mx-auto mb-6">
            Contáctanos y te ayudaremos a encontrar al profesional adecuado
            para tu proyecto.
          </p>
          <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all">
            Contactar Soporte
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
