import { prisma } from "@/lib/prisma";
import type { ServiceRequest } from "@/types";

export async function getRequests(): Promise<ServiceRequest[]> {
  const requests = await prisma.serviceRequest.findMany({
    include: {
      client: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return requests.map((req) => ({
    id: req.id,
    client: {
      id: req.client.id,
      name: req.client.name,
      avatarUrl: req.client.avatarUrl || "/images/featured-provider.png",
      role: req.client.role as "client",
      location: req.client.location,
      isVerified: req.client.isVerified,
      verificationLevel: req.client.verificationLevel as "premium" | "standard" | "none",
    },
    title: req.title,
    description: req.description,
    budgetMin: req.budgetMin,
    budgetMax: req.budgetMax,
    budgetUnit: req.budgetUnit as "fixed" | "hourly" | "daily" | "monthly",
    urgency: req.urgency as "urgent" | "new" | "standard",
    category: req.category.name,
    categoryIcon: req.categoryIcon,
    location: req.location,
    createdAt: req.createdAt.toISOString(),
  }));
}
