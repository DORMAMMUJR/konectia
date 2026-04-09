export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-2xl sm:rounded-[2rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6 sm:mb-8 font-[var(--font-headline)]">
              ¿Listo para transformar tu forma de contratar?
            </h2>
            <p className="text-on-primary-container text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto">
              Únete a la plataforma que está definiendo el estándar de
              profesionalismo en el mercado mexicano.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-secondary-container text-on-secondary-container px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform active:scale-95">
                Encontrar un Experto
              </button>
              <button className="border-2 border-white/20 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition-all active:scale-95">
                Registrarme como Profesional
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
