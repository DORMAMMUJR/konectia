import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";

export async function getProjects(userId?: string): Promise<Project[]> {
  const where = userId
    ? { OR: [{ clientId: userId }, { professionalId: userId }] }
    : {};

  const projects = await prisma.project.findMany({
    where,
    include: {
      professional: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return projects.map((proj) => ({
    id: proj.id,
    title: proj.title,
    professional: {
      id: proj.professional.id,
      name: proj.professional.name || "Usuario",
      avatarUrl: proj.professional.avatarUrl || "/images/featured-provider.png",
      role: proj.professional.role as "professional",
      location: proj.professional.location || "Ubicación no especificada",
      isVerified: proj.professional.isVerified,
      verificationLevel: proj.professional.verificationLevel as "premium" | "standard" | "none",
    },
    progress: proj.progress,
    status: proj.status as "active" | "pending" | "completed",
    imageUrl: proj.imageUrl || "/images/hero-bg.png",
  }));
}
