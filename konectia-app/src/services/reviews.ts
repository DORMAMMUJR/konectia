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

  return reviews.map((rev) => {
    // Safely handle nullable author name to prevent substring-of-null crashes
    const authorName = rev.author?.name ?? "Usuario Anónimo";
    const authorInitials = authorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return {
      id: rev.id,
      authorInitials,
      authorName,
      rating: rev.rating,
      text: rev.text,
      projectType: rev.projectType,
      date: rev.createdAt.toISOString().split("T")[0], // YYYY-MM-DD
    } as Review;
  });
}
