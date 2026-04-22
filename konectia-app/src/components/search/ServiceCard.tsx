"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceProps {
  id: string;
  title: string;
  imageUrl: string;
  provider: {
    id: string;
    name: string;
    avatarUrl: string;
    isVerified: boolean;
  };
  rating: number;
  reviewCount: number;
  startingPrice: number;
}

export default function ServiceCard({ service }: { service: ServiceProps }) {
  return (
    <motion.div 
      className="group bg-white rounded-xl overflow-hidden border border-surface-container flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(11,31,58,0.1)] transition-all duration-300 h-full"
    >
      {/* Thumbnail */}
      <Link href={`/servicio/${service.id}`} className="relative h-48 w-full block overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
        
        {/* Favorite Button Overlay (Fiverr Style) */}
        <button 
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-outline-variant hover:text-tertiary hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        {/* Provider Mini Info */}
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={service.provider.avatarUrl}
            alt={service.provider.name}
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <Link href={`/perfil/${service.provider.id}`} className="text-sm font-semibold text-on-surface-variant hover:text-tertiary transition-colors truncate">
            {service.provider.name}
          </Link>
          {service.provider.isVerified && (
            <span 
              className="material-symbols-outlined text-tertiary text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/servicio/${service.id}`} className="block mb-4 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-primary font-[var(--font-headline)] leading-snug group-hover:text-tertiary transition-colors line-clamp-2">
            {service.title}
          </h3>
        </Link>
        
        {/* Footer: Rating & Price */}
        <div className="border-t border-surface-container pt-3 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-tertiary">
            <span 
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-sm font-bold text-on-surface">
              {service.rating.toFixed(1)}
            </span>
            <span className="text-sm text-outline">
              ({service.reviewCount})
            </span>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] sm:text-xs font-bold text-outline-variant uppercase tracking-wider block leading-none mb-1">
              Desde
            </span>
            <span className="text-base sm:text-lg font-bold text-primary">
              MXN ${service.startingPrice}
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
