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
                Explora el marketplace por categoría
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant">
                Encuentra el talento perfecto para cualquier proyecto, desde diseño hasta reparaciones locales.
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

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" staggerDelay={0.08}>
          {categories.slice(0, 10).map((cat: Category) => (
            <StaggerItem key={cat.id}>
              <Link href={`/buscar?category=${cat.id}`} className="block h-full">
                <div
                  className="group bg-white p-6 rounded-2xl hover:shadow-[0_10px_25px_rgba(11,31,58,0.06)] transition-all duration-300 border border-surface-container flex flex-col items-center text-center hover:border-tertiary/30 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4 group-hover:bg-tertiary-fixed transition-colors">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-tertiary">
                      {cat.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1 font-[var(--font-headline)] group-hover:text-tertiary transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
