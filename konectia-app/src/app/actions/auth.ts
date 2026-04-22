"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
  role: "client" | "professional";
}) {
  // Validate input
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password, role } = parsed.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Ya existe una cuenta con este correo electrónico" };
  }

  // Hash password
  const passwordHash = await hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      location: "México",
      verificationLevel: "none",
    },
  });

  // If professional, create the professional profile
  if (role === "professional") {
    await prisma.professional.create({
      data: {
        userId: user.id,
        title: "Nuevo Profesional",
        specialty: "Por definir",
        hourlyRate: 0,
      },
    });
  }

  return { success: true, userId: user.id };
}
