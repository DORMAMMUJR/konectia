import type { Professional } from "@/types";
import mockProfessionals from "./mocks/professionals.json";

// HOY: JSON local con latencia simulada
// MAÑANA: return fetch('https://api.konectia.mx/professionals')
export async function getProfessionals(): Promise<Professional[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProfessionals as unknown as Professional[]), 800);
  });
}

export async function getProfessionalById(
  id: string
): Promise<Professional | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = (mockProfessionals as unknown as Professional[]).find(
        (p) => p.id === id
      );
      resolve(found);
    }, 500);
  });
}
