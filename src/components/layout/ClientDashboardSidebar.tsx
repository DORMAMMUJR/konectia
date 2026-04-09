"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientDashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Mi Panel", href: "/dashboard/cliente", icon: "home" },
    { label: "Mis Proyectos", href: "/dashboard/cliente/proyectos", icon: "handyman" },
    { label: "Pagos y CFDI", href: "/dashboard/cliente/pagos", icon: "receipt_long" },
    { label: "Mensajes", href: "/mensajes", icon: "chat_bubble" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50 dark:bg-[#00030a] hidden md:flex flex-col py-6 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-primary dark:text-white font-[var(--font-headline)]">
          Panel de Cliente
        </h2>
        <p className="text-xs text-on-surface-variant font-medium mt-1">
          KonectIA Seguro
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "text-secondary-container bg-white border-r-4 border-secondary-container shadow-sm"
                  : "text-slate-500 hover:text-primary hover:bg-slate-100"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-6">
        <Link href="/buscar" className="w-full block text-center py-3 px-4 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform">
          Nuevo Proyecto
        </Link>
      </div>
    </aside>
  );
}
