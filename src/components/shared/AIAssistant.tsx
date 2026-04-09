"use client";

import { useState } from "react";
import Image from "next/image";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-[0_10px_25px_rgba(0,3,10,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <span className="material-symbols-outlined text-2xl">smart_toy</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-[0_20px_40px_rgba(8,28,54,0.15)] flex flex-col overflow-hidden z-50 border border-outline-variant/20 animate-[slideUp_0.3s_ease]">
          
          <div className="bg-primary-container p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
              </div>
              <div>
                 <h3 className="font-bold text-sm font-[var(--font-headline)]">KonectIA Core</h3>
                 <p className="text-[10px] opacity-80 uppercase tracking-widest">Asistente Virtual</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-surface-container-lowest space-y-4">
             <div className="flex items-start gap-2">
                 <div className="w-6 h-6 rounded-full bg-secondary-container text-white flex items-center justify-center flex-shrink-0 mt-1">
                   <span className="material-symbols-outlined text-[12px]">smart_toy</span>
                 </div>
                 <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none text-sm text-on-surface">
                   Hola, soy el asistente de KonectIA. ¿Buscas a un profesional en específico o tienes dudas sobre cómo funciona nuestro sistema de Escrow?
                 </div>
             </div>
             
             {/* Quick chips */}
             <div className="flex flex-wrap gap-2 pl-8 pt-2">
               <button className="text-[10px] sm:text-xs bg-white border border-outline-variant/30 px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors font-medium">
                 ¿Cómo funciona el Escrow?
               </button>
               <button className="text-[10px] sm:text-xs bg-white border border-outline-variant/30 px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors font-medium">
                 Busco un electricista
               </button>
             </div>
          </div>

          <div className="p-3 border-t border-outline-variant/20 bg-white">
            <div className="bg-surface-container-low rounded-full flex items-center px-4 py-2">
              <input type="text" placeholder="Escribe tu consulta..." className="flex-1 bg-transparent border-none text-sm py-1 focus:ring-0 px-0" />
              <button className="text-secondary hover:text-primary transition-colors pl-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
