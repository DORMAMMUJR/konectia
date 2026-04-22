import { prisma } from "@/lib/prisma";

export async function getProfessionals() {
  const users = await prisma.user.findMany({
    where: { role: "professional" },
    include: {
      professional: {
        include: {
          badges: true,
          education: true,
          experience: true,
          portfolio: true,
        },
      },
    },
  });

  // Flatten the structure to match the existing component expectations
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl || "/images/featured-provider.png",
    role: user.role,
    location: user.location,
    isVerified: user.isVerified,
    verificationLevel: user.verificationLevel,
    title: user.professional?.title || "",
    specialty: user.professional?.specialty || "",
    rating: user.professional?.rating || 0,
    reviewCount: user.professional?.reviewCount || 0,
    yearsExperience: user.professional?.yearsExperience || 0,
    completedJobs: user.professional?.completedJobs || 0,
    recurringClients: user.professional?.recurringClients || 0,
    responseTime: user.professional?.responseTime || "N/A",
    hourlyRate: user.professional?.hourlyRate || 0,
    badges: user.professional?.badges || [],
    education: user.professional?.education || [],
    experience: user.professional?.experience || [],
    portfolio: user.professional?.portfolio || [],
  }));
}

export async function getProfessionalById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      professional: {
        include: {
          badges: true,
          education: true,
          experience: true,
          portfolio: true,
        },
      },
    },
  });

  if (!user || !user.professional) return undefined;

  return {
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl || "/images/featured-provider.png",
    role: user.role,
    location: user.location,
    isVerified: user.isVerified,
    verificationLevel: user.verificationLevel,
    title: user.professional.title,
    specialty: user.professional.specialty,
    rating: user.professional.rating,
    reviewCount: user.professional.reviewCount,
    yearsExperience: user.professional.yearsExperience,
    completedJobs: user.professional.completedJobs,
    recurringClients: user.professional.recurringClients,
    responseTime: user.professional.responseTime,
    hourlyRate: user.professional.hourlyRate,
    badges: user.professional.badges,
    education: user.professional.education,
    experience: user.professional.experience,
    portfolio: user.professional.portfolio,
  };
}
