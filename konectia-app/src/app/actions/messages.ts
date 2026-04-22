"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function sendMessage(conversationId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "No autorizado." };
  }

  if (!content.trim()) {
    return { error: "El mensaje no puede estar vacío." };
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) {
    return { error: "Conversación no encontrada." };
  }

  const isParticipant =
    conversation.participantA === session.user.id ||
    conversation.participantB === session.user.id;

  if (!isParticipant) {
    return { error: "No eres participante de esta conversación." };
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: session.user.id,
      content,
      type: "text",
    },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  revalidatePath("/mensajes");

  return { success: true, messageId: message.id };
}
