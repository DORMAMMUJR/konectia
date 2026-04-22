import Link from "next/link";

const footerLinks = [
  { label: "Legal y Privacidad", href: "#" },
  { label: "Política de Escrow", href: "#" },
  { label: "Cumplimiento Fiscal", href: "#" },
  { label: "Soporte", href: "#" },
  { label: "Profesionales Verificados", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-12 md:py-16 max-w-7xl mx-auto gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
            <span className="text-xl font-bold text-white font-[var(--font-headline)]">
              INTECNIA
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-xs">
            © {new Date().getFullYear()} INTECNIA. Servicios Profesionales de
            Calidad Institucional. Cumplimiento SAT.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
