import type { Category } from "@/types";
import { getCategories } from "@/services/categories";
import Link from "next/link";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/shared/MotionWrappers";

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-16 lg:py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeInUp>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tighter mb-4 font-[var(--font-headline)]">
                Explora Categorías Profesionales
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant">
                Directorio especializado con expertos verificados por nuestro
                comité de calidad y cumplimiento institucional.
              </p>
            </div>
            <Link
              href="/categorias"
              className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap"
            >
              Ver todas las categorías
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.12}>
          {categories.map((cat: Category) => (
            <StaggerItem key={cat.id}>
              <div
                className="group bg-surface-container-lowest p-6 sm:p-8 rounded-xl hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(45,188,254,0.12)] transition-all duration-300 border-b-4 border-transparent hover:border-secondary-container cursor-pointer"
              >
                <div className="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">
                    {cat.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 font-[var(--font-headline)] transition-colors group-hover:text-secondary">
                  {cat.name}
                </h3>
                <p className="text-on-surface-variant text-sm mb-4">
                  {cat.description}
                </p>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  {cat.expertCount.toLocaleString()} Expertos
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
