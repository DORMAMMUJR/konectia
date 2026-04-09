import Image from "next/image";
import type { Conversation } from "@/types";

export default function ConversationList({
  conversations,
  activeId,
}: {
  conversations: Conversation[];
  activeId: string;
}) {
  return (
    <div className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
      {conversations.map((conv) => {
        const isActive = conv.id === activeId;
        return (
          <div
            key={conv.id}
            className={`rounded-xl p-4 flex gap-3 cursor-pointer transition-all ${
              isActive
                ? "bg-surface-container-lowest shadow-sm border-l-4 border-secondary"
                : "hover:bg-surface-container-high border-l-4 border-transparent"
            }`}
          >
            <Image
              src={conv.participant.avatarUrl}
              alt={conv.participant.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-on-surface text-sm truncate">
                  {conv.participant.name}
                </h3>
                <span className="text-[10px] text-outline">
                  {conv.lastMessageTime}
                </span>
              </div>
              <p
                className={`text-sm truncate ${
                  conv.unreadCount > 0
                    ? "text-secondary font-medium"
                    : "text-outline"
                }`}
              >
                {conv.lastMessage}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
