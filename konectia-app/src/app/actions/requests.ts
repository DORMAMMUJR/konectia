"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { serviceRequestSchema } from "@/lib/validations/service-request";

export async function createServiceRequest(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Debes iniciar sesión para crear una solicitud." };
  }

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    budgetMin: Number(formData.get("budgetMin")),
    budgetMax: Number(formData.get("budgetMax")),
    budgetUnit: formData.get("budgetUnit") as any,
    urgency: formData.get("urgency") as any,
    categoryId: formData.get("categoryId") as string,
    location: formData.get("location") as string,
  };

  const parsed = serviceRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const category = await prisma.category.findUnique({
    where: { id: parsed.data.categoryId },
  });

  if (!category) {
    return { error: "Categoría no válida." };
  }

  const request = await prisma.serviceRequest.create({
    data: {
      ...parsed.data,
      clientId: session.user.id,
      categoryIcon: category.icon,
    },
  });

  return { success: true, requestId: request.id };
}
