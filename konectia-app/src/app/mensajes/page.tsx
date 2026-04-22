import TopNav from "@/components/layout/TopNav";
import ConversationList from "@/components/messaging/ConversationList";
import QuotationCard from "@/components/messaging/QuotationCard";
import { getConversations } from "@/services/conversations";
import Image from "next/image";

export const metadata = {
  title: "Mensajes | KonectIA",
};

export default async function MensajesPage() {
  const conversations = await getConversations();

  const activeConv = conversations[0]; // Assuming the first is active
  
  const mockQuotation = {
    title: "Reparación Hidráulica Cocina",
    items: [
      { label: "Mano de Obra Especializada", amount: 1200 },
      { label: "Materiales (Válvulas y Sellos)", amount: 450 }
    ],
    total: 1650,
    duration: "3 - 5 horas",
    startDate: "Inmediato",
    warranty: "Incluido (30 días)"
  };

  return (
    <>
      <TopNav />
      {/* Hide overflow on body to make the chat app feel native */}
      <div className="flex h-screen pt-[72px] bg-surface-container-low overflow-hidden max-w-7xl mx-auto w-full">
        {/* Sidebar: Conversations */}
        <aside className="w-full md:w-80 border-r border-outline-variant/20 flex flex-col bg-surface-container-low hidden md:flex flex-shrink-0">
          <div className="p-4 sm:p-6 pb-2">
            <h2 className="text-xl font-bold font-[var(--font-headline)] mb-4">
              Mensajes
            </h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">
                search
              </span>
              <input
                type="text"
                className="w-full bg-surface-container-lowest border-none rounded-xl pl-10 py-2.5 text-sm focus:ring-2 focus:ring-secondary/50 shadow-sm"
                placeholder="Buscar conversación..."
              />
            </div>
          </div>
          <ConversationList conversations={conversations} activeId={activeConv?.id || ""} />
        </aside>

        {/* Main Chat Area */}
        <section className="flex-1 flex flex-col bg-surface-container-lowest relative">
          {/* Mobile Back Button & Header */}
          <header className="px-4 py-3 sm:px-6 sm:py-4 border-b border-outline-variant/20 flex justify-between items-center bg-white/80 backdrop-blur-md z-10 sticky top-0">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-1 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="relative">
                <Image
                  src={activeConv?.participant.avatarUrl || "/images/featured-provider.png"}
                  alt={activeConv?.participant.name || "User"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h2 className="font-bold text-on-surface text-sm sm:text-base leading-tight">
                  {activeConv?.participant.name}
                </h2>
                <div className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[12px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="text-[10px] sm:text-xs text-secondary font-medium uppercase tracking-wider">
                    Miembro Verificado
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button className="p-2 hover:bg-surface-container rounded-full transition-all text-outline">
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">call</span>
              </button>
              <button className="p-2 hover:bg-surface-container rounded-full transition-all text-outline">
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">more_vert</span>
              </button>
            </div>
          </header>

          {/* Chat Thread */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex justify-center">
              <span className="px-4 py-1 bg-surface-container-low rounded-full text-[10px] sm:text-xs text-outline font-medium">
                Hoy, 24 de Mayo
              </span>
            </div>

            {/* Received text */}
            <div className="flex items-end gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%]">
              <div className="bg-surface-container-low p-3 sm:p-4 rounded-2xl rounded-bl-none">
                <p className="text-sm text-on-surface">
                  Hola, he revisado los detalles de la fuga en su cocina. Basado
                  en las fotos, he preparado una cotización formal para la
                  reparación integral y cambio de válvulas.
                </p>
                <span className="text-[10px] text-outline mt-1 sm:mt-2 block">
                  10:42 AM
                </span>
              </div>
            </div>

            {/* Quotation Card inside Chat */}
            <div className="flex justify-start">
              <QuotationCard quotation={mockQuotation} />
            </div>

            {/* Sent message */}
            <div className="flex items-end justify-end gap-2 sm:gap-3 ml-auto max-w-[90%] sm:max-w-[80%]">
              <div className="bg-primary p-3 sm:p-4 rounded-2xl rounded-br-none text-white">
                <p className="text-sm">
                  Perfecto Ricardo, me parece justo el precio. ¿Podrías comenzar mañana a las 9:00 AM?
                </p>
                <div className="flex justify-end items-center gap-1 mt-1 sm:mt-2">
                  <span className="text-[10px] opacity-70">10:50 AM</span>
                  <span
                    className="material-symbols-outlined text-[14px] text-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    done_all
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 sm:p-4 md:p-6 border-t border-outline-variant/20 bg-white">
            <div className="flex items-center gap-2 sm:gap-4 bg-surface-container-low rounded-full px-4 sm:px-6 py-2">
              <button className="material-symbols-outlined text-outline hover:text-primary">
                attach_file
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-0"
              />
              <button className="bg-primary text-white p-2 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[24px]">send</span>
              </button>
            </div>
          </div>
        </section>

        {/* Optional Right Panel (Hidden on smaller screens, shown on XL) */}
        <aside className="w-72 hidden xl:flex flex-col border-l border-outline-variant/20 p-6 bg-surface-container-low flex-shrink-0">
          <h3 className="font-bold text-on-surface-variant mb-6 uppercase tracking-widest text-xs">
            Información del Proyecto
          </h3>
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm mb-6">
            <span className="text-[10px] sm:text-xs text-outline block mb-1 uppercase tracking-wider font-bold">
              Estado del Trabajo
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tertiary-container rounded-full animate-pulse"></span>
              <span className="font-semibold text-on-tertiary-container text-sm">
                Cotización Pendiente
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-on-surface mb-2 font-[var(--font-headline)]">Ubicación</h4>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm border bg-surface-container-lowest py-2 px-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                Polanco, CDMX
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface mb-2 font-[var(--font-headline)]">Archivos Compartidos</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20 relative cursor-pointer">
                  <Image src="/images/hero-bg.png" alt="File 1" fill className="object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20 relative cursor-pointer">
                  <Image src="/images/client-workflow.png" alt="File 2" fill className="object-cover hover:scale-105 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-outline-variant/20">
            <button className="w-full py-3 text-sm font-semibold text-error/80 hover:text-error hover:bg-error/5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                report
              </span>
              Reportar Incidente
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
