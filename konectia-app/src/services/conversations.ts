import { prisma } from "@/lib/prisma";
import type { Conversation } from "@/types";

export async function getConversations(userId?: string): Promise<Conversation[]> {
  const where = userId
    ? { OR: [{ participantA: userId }, { participantB: userId }] }
    : {};

  const conversations = await prisma.conversation.findMany({
    where,
    include: {
      userA: true,
      userB: true,
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return conversations.map((conv) => {
    // Pick the "other" participant relative to the current user
    const participant = userId && conv.participantA === userId ? conv.userB : conv.userA;
    const lastMsg = conv.messages[0];

    return {
      id: conv.id,
      participant: {
        id: participant.id,
        name: participant.name || "Usuario",
        avatarUrl: participant.avatarUrl || "/images/featured-provider.png",
        role: participant.role as "client" | "professional" | "guest",
        location: participant.location || "Ubicación no especificada",
        isVerified: participant.isVerified,
        verificationLevel: participant.verificationLevel as "premium" | "standard" | "none",
      },
      lastMessage: lastMsg?.content || "",
      lastMessageTime: lastMsg?.createdAt.toISOString() || conv.createdAt.toISOString(),
      isActive: true,
      unreadCount: 0,
    };
  });
}
