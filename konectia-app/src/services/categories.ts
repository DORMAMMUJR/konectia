import type { Category } from "@/types";
import mockCategories from "./mocks/categories.json";

// HOY: JSON local con latencia simulada
// MAÑANA: return fetch('https://api.konectia.mx/categories')
export async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories as Category[]), 800);
  });
}
