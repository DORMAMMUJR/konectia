import { prisma } from "@/lib/prisma";
import type { Review } from "@/types";

export async function getReviews(professionalId?: string): Promise<Review[]> {
  const where = professionalId ? { professionalId } : {};

  const reviews = await prisma.review.findMany({
    where,
    include: {
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((rev) => ({
    id: rev.id,
    authorInitials: rev.author.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    authorName: rev.author.name,
    rating: rev.rating,
    text: rev.text,
    projectType: rev.projectType,
    date: rev.createdAt.toISOString().split("T")[0],
  }));
}
