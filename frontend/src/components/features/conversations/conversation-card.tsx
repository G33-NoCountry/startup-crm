import { Conversation } from "@/types/conversation.types";
import { ChevronRight } from "lucide-react";
import { getRelativeTime } from "@/lib/utils/dateUtils";

interface ConversationCardProps {
  conversation: Conversation;
  lastMessage?: string;
  onClick: () => void;
}

export function ConversationCard({ conversation, lastMessage = "Sin mensajes", onClick }: ConversationCardProps) {
  const relativeTime = getRelativeTime(conversation.last_interaction);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColor = conversation.channel === "whatsapp" 
    ? "bg-green-500" 
    : "bg-blue-500";

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-md group"
    >
      <div className="flex items-start gap-3">
        <div className={`${avatarColor} text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
          {getInitials(conversation.contact?.full_name || "?")}
        </div>

        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {conversation.contact?.full_name || "Sin nombre"}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
              {relativeTime}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {lastMessage}
          </p>
          {conversation.status && (
            <span className="inline-block mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              Activa
            </span>
          )}
        </div>

        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0 transition-colors" />
      </div>
    </button>
  );
}
