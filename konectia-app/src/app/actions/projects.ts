"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateProjectProgress(projectId: string, newProgress: number) {
  // 1. Seguridad: Validar sesión
  const session = await auth()
  if (!session?.user?.id) throw new Error("No autorizado")

  // 2. Autorización: Validar que el usuario logueado sea el dueño de este proyecto
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (project?.professionalId !== session.user.id) {
    throw new Error("Acceso denegado: No eres el profesional de este proyecto")
  }

  // Validación extra: progreso lógico
  if (newProgress < 0 || newProgress > 100) {
    throw new Error("El progreso debe estar entre 0 y 100")
  }

  // 3. Mutación en PostgreSQL
  await prisma.project.update({
    where: { id: projectId },
    data: { progress: newProgress }
  })

  // 4. Magia de Next.js: Purgar el caché para que el cambio sea instantáneo en UI
  revalidatePath('/dashboard/cliente')
  revalidatePath('/dashboard/profesional')
  
  return { success: true }
}
