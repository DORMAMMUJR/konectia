import type { Conversation } from "@/types";
import mockConversations from "./mocks/conversations.json";

export async function getConversations(): Promise<Conversation[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockConversations as Conversation[]), 500);
  });
}
