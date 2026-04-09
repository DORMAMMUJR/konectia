import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import AIAssistant from "@/components/shared/AIAssistant";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KonectIA | Servicios Profesionales de Confianza en México",
  description:
    "La primera plataforma institucional que conecta expertos certificados con empresas y particulares bajo los más altos estándares de seguridad y cumplimiento.",
  keywords: [
    "servicios profesionales",
    "México",
    "marketplace",
    "escrow",
    "verificación",
    "SAT",
    "CONOCER",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable} h-full`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-surface text-on-surface">
        {children}
        <AIAssistant />
      </body>
    </html>
  );
}
