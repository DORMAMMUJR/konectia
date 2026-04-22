"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createReview(professionalId: string, rating: number, text: string, projectType: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Debes iniciar sesión para dejar una reseña." };
  }

  if (rating < 1 || rating > 5) {
    return { error: "La calificación debe estar entre 1 y 5." };
  }

  const professional = await prisma.professional.findUnique({
    where: { id: professionalId },
  });

  if (!professional) {
    return { error: "Profesional no encontrado." };
  }

  const review = await prisma.review.create({
    data: {
      professionalId,
      authorId: session.user.id,
      rating,
      text,
      projectType,
    },
  });

  // Update professional metrics
  const allReviews = await prisma.review.findMany({
    where: { professionalId },
  });

  const newRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;

  await prisma.professional.update({
    where: { id: professionalId },
    data: {
      rating: Number(newRating.toFixed(1)),
      reviewCount: allReviews.length,
    },
  });

  revalidatePath(`/perfil/${professionalId}`);

  return { success: true, reviewId: review.id };
}
