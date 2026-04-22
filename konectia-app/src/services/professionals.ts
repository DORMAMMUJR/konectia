import { prisma } from "@/lib/prisma";
import { Professional } from "@/types";

/**
 * Maps a raw Prisma User+Professional result to the strict Professional interface.
 * Uses nullish coalescing (??) for nullable DB fields and type assertions (as)
 * for string-literal union types that Prisma infers as plain `string`.
 */
function mapToProfessional(user: {
  id: string;
  name: string | null;
  image: string | null;
  avatarUrl: string | null;
  role: string;
  location: string | null;
  isVerified: boolean;
  verificationLevel: string;
  emailVerified: Date | null;
  professional: {
    title: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    yearsExperience: number;
    completedJobs: number;
    recurringClients: number;
    responseTime: string;
    hourlyRate: number;
    badges: { id: string; type: string; label: string; sublabel: string; status: string; icon: string }[];
    education: { id: string; institution: string; degree: string; year: string }[];
    experience: { id: string; company: string; position: string; period: string }[];
    portfolio: { id: string; title: string; imageUrl: string; span: string | null }[];
  } | null;
}): Professional {
  const pro = user.professional;

  return {
    id: user.id,
    name: user.name ?? "Profesional",
    avatarUrl: user.avatarUrl ?? user.image ?? "/images/featured-provider.png",
    role: "professional" as const,
    location: user.location ?? "Ubicación no especificada",
    isVerified: user.isVerified,
    verificationLevel: (user.verificationLevel as "premium" | "standard" | "none") ?? "none",
    title: pro?.title ?? "Especialista",
    specialty: pro?.specialty ?? "Servicios Generales",
    rating: pro?.rating ?? 5.0,
    reviewCount: pro?.reviewCount ?? 0,
    yearsExperience: pro?.yearsExperience ?? 0,
    completedJobs: pro?.completedJobs ?? 0,
    recurringClients: pro?.recurringClients ?? 0,
    responseTime: pro?.responseTime ?? "N/A",
    hourlyRate: pro?.hourlyRate ?? 0,
    badges: (pro?.badges ?? []).map((b) => ({
      ...b,
      type: b.type as "biometric" | "conocer" | "sat",
      status: b.status as "verified" | "pending" | "unverified",
    })),
    education: (pro?.education ?? []).map((e) => ({
      institution: e.institution,
      degree: e.degree,
      year: e.year,
    })),
    experience: (pro?.experience ?? []).map((e) => ({
      company: e.company,
      position: e.position,
      period: e.period,
    })),
    portfolio: (pro?.portfolio ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      imageUrl: p.imageUrl,
      span: (p.span as "large" | "normal" | "wide") ?? undefined,
    })),
  };
}

export async function getProfessionals(): Promise<Professional[]> {
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

  return users.map(mapToProfessional);
}

export async function getProfessionalById(id: string): Promise<Professional | undefined> {
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

  return mapToProfessional(user);
}
