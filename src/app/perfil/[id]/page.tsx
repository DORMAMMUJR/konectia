import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { getProfessionalById, getProfessionals } from "@/services/professionals";
import { getReviews } from "@/services/reviews";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Professional, Review, VerificationBadge } from "@/types";

// Generate static params for all professionals
export async function generateStaticParams() {
  const pros = await getProfessionals();
  return pros.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pro = await getProfessionalById(id);
  if (!pro) return { title: "Profesional no encontrado | KonectIA" };
  return {
    title: `${pro.name} — ${pro.title} | KonectIA`,
    description: `${pro.specialty}. ${pro.completedJobs} trabajos completados. Rating ${pro.rating}/5.`,
  };
}

function BadgeRow({ badges }: { badges: VerificationBadge[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {badges.map((b) => (
        <div
          key={b.type}
          className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4"
        >
          <div className="bg-white p-3 rounded-lg shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-secondary">
              {b.icon}
            </span>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              {b.label}
            </p>
            <p className="text-sm font-semibold">{b.sublabel}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25;
  return (
    <div className="flex text-on-tertiary-container">
      {[...Array(full)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {hasHalf && (
        <span className="material-symbols-outlined">star_half</span>
      )}
    </div>
  );
}

export default async function PerfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pro = await getProfessionalById(id);
  if (!pro) notFound();

  const reviews = await getReviews();

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Profile Content */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Hero Profile */}
            <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl ambient-shadow">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                <div className="relative flex-shrink-0">
                  <Image
                    src={pro.avatarUrl}
                    alt={pro.name}
                    width={160}
                    height={160}
                    className="w-28 h-28 sm:w-40 sm:h-40 rounded-xl object-cover ring-4 ring-surface-container-low"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-secondary-container p-2 rounded-full border-4 border-white">
                    <span
                      className="material-symbols-outlined text-white text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-[var(--font-headline)] text-primary">
                      {pro.name}
                    </h1>
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Destacado
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl text-on-surface-variant font-[var(--font-headline)]">
                    {pro.title}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-secondary">
                        location_on
                      </span>
                      {pro.location}
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-secondary">
                        work
                      </span>
                      {pro.yearsExperience}+ años de experiencia
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                      <span
                        className="material-symbols-outlined text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {pro.rating} ({pro.reviewCount} reseñas)
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Badges */}
            <BadgeRow badges={pro.badges} />

            {/* Portfolio */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-[var(--font-headline)] px-2">
                Portafolio de Proyectos
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {pro.portfolio.map((item, i) => (
                  <div
                    key={item.id}
                    className={`rounded-xl overflow-hidden group relative ${
                      item.span === "large"
                        ? "col-span-2 row-span-2"
                        : item.span === "wide"
                        ? "col-span-2 h-48"
                        : "aspect-square"
                    }`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6">
                      <p className="text-white font-semibold text-sm sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-surface-container-low p-6 sm:p-8 rounded-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <h2 className="text-2xl font-bold font-[var(--font-headline)]">
                  Reseñas de Clientes
                </h2>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-2xl font-bold">{pro.rating}</span>
                  <StarDisplay rating={pro.rating} />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {reviews.map((rev: Review) => (
                  <div
                    key={rev.id}
                    className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl ambient-shadow border-l-4 border-secondary-container"
                  >
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {rev.authorInitials}
                        </div>
                        <div>
                          <p className="font-bold">{rev.authorName}</p>
                          <p className="text-xs text-on-surface-variant">
                            {rev.projectType} • {rev.date}
                          </p>
                        </div>
                      </div>
                      <StarDisplay rating={rev.rating} />
                    </div>
                    <p className="text-on-surface-variant italic text-sm sm:text-base">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Experience */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-[var(--font-headline)]">
                  Educación
                </h3>
                {pro.education.map((ed, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary mt-1">
                      school
                    </span>
                    <div>
                      <p className="font-bold">{ed.institution}</p>
                      <p className="text-sm">{ed.degree}</p>
                      <p className="text-xs text-on-surface-variant">
                        {ed.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-[var(--font-headline)]">
                  Experiencia
                </h3>
                {pro.experience.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary mt-1">
                      business_center
                    </span>
                    <div>
                      <p className="font-bold">{exp.company}</p>
                      <p className="text-sm">{exp.position}</p>
                      <p className="text-xs text-on-surface-variant">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Quote Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Quote Card */}
              <div className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
                <div className="signature-gradient p-6 text-white">
                  <p className="text-sm uppercase tracking-widest opacity-80">
                    Desde
                  </p>
                  <h3 className="text-3xl font-bold font-[var(--font-headline)]">
                    ${pro.hourlyRate.toLocaleString()} MXN / hr
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-2">
                        Tipo de Servicio
                      </label>
                      <select className="w-full bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary-container py-2.5 px-3">
                        <option>Consultoría Industrial</option>
                        <option>Reparación Residencial</option>
                        <option>Plan de Mantenimiento</option>
                        <option>Revisión de Certificación</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-2">
                        Mensaje
                      </label>
                      <textarea
                        className="w-full bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary-container p-3"
                        placeholder="Describa las necesidades de su proyecto..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <button className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 font-[var(--font-headline)]">
                    <span className="material-symbols-outlined">send</span>
                    Solicitar Cotización
                  </button>

                  {/* Security */}
                  <div className="bg-surface-container-low p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        security
                      </span>
                      <p className="text-xs font-bold uppercase tracking-widest">
                        Protección con Custodia (Escrow)
                      </p>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Tu pago es retenido de forma segura por KonectIA y solo
                      se libera cuando confirmas que el trabajo se completó a
                      tu satisfacción. Facturación SAT incluida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-xl ambient-shadow space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">
                    Tiempo de Respuesta
                  </span>
                  <span className="font-bold">{pro.responseTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">
                    Trabajos Completados
                  </span>
                  <span className="font-bold">{pro.completedJobs}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">
                    Clientes Recurrentes
                  </span>
                  <span className="font-bold text-secondary">
                    {pro.recurringClients}%
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
