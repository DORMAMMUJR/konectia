export function ProfessionalCardSkeleton() {
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-surface-container">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-200 animate-pulse flex-shrink-0" />
        <div className="space-y-2.5 flex-1 mt-1">
          <div className="h-5 bg-slate-200 rounded-lg animate-pulse w-3/5" />
          <div className="h-3 bg-slate-200 rounded animate-pulse w-2/5" />
          <div className="h-3 bg-slate-100 rounded animate-pulse w-1/3" />
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-slate-100 rounded animate-pulse w-full" />
        <div className="h-3 bg-slate-100 rounded animate-pulse w-4/5" />
      </div>
      <div className="flex gap-3 pt-4 border-t border-surface-container">
        <div className="flex-1 h-9 bg-slate-200 rounded-lg animate-pulse" />
        <div className="flex-1 h-9 bg-slate-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl border border-surface-container">
      <div className="w-14 h-14 bg-slate-200 rounded-xl animate-pulse mb-6" />
      <div className="h-5 bg-slate-200 rounded animate-pulse w-2/3 mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-100 rounded animate-pulse w-full" />
        <div className="h-3 bg-slate-100 rounded animate-pulse w-4/5" />
      </div>
      <div className="h-3 bg-slate-100 rounded animate-pulse w-1/3" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[870px] flex items-center bg-primary-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12">
        <div className="space-y-6 max-w-2xl">
          <div className="h-12 bg-white/10 rounded-xl animate-pulse w-4/5" />
          <div className="h-12 bg-white/10 rounded-xl animate-pulse w-3/5" />
          <div className="h-5 bg-white/5 rounded animate-pulse w-2/3" />
          <div className="h-16 bg-white/10 rounded-2xl animate-pulse w-full mt-8" />
        </div>
      </div>
    </section>
  );
}

export function RequestCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container">
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
        <div className="space-y-2 flex-1 mt-1">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-1/3" />
          <div className="h-2 bg-slate-100 rounded animate-pulse w-1/4" />
        </div>
      </div>
      <div className="h-5 bg-slate-200 rounded animate-pulse w-2/3 mb-3" />
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-slate-100 rounded animate-pulse w-full" />
        <div className="h-3 bg-slate-100 rounded animate-pulse w-4/5" />
      </div>
      <div className="pt-4 border-t border-surface-container">
        <div className="h-10 bg-slate-200 rounded-xl animate-pulse w-full" />
      </div>
    </div>
  );
}
