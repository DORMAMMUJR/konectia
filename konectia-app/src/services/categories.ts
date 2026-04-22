import { prisma } from "@/lib/prisma";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.icon,
    expertCount: cat.expertCount,
  }));
}
