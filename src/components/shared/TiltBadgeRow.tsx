"use client";

import Tilt from "react-parallax-tilt";
import type { VerificationBadge } from "@/types";

export default function TiltBadgeRow({ badges }: { badges: VerificationBadge[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {badges.map((b) => (
        <Tilt
          key={b.type}
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#2dbcfe"
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          scale={1.02}
          transitionSpeed={400}
        >
          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 cursor-pointer select-none">
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
        </Tilt>
      ))}
    </section>
  );
}
