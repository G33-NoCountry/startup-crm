import { Conversation } from "@/types/conversation.types";
import { Mail, MessageCircle, Circle } from "lucide-react";

interface ConversationListItemProps {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}

export function ConversationListItem({
    conversation,
    isActive,
    onClick,
}: ConversationListItemProps) {
    const formattedDate = new Date(conversation.last_interaction).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
    });

    return (
        <button
            onClick={onClick}
            className={`w-full p-4 border-b border-gray-200 dark:border-gray-700 transition-colors text-left ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">
                            {conversation.contact?.full_name || "Sin nombre"}
                        </h3>
                        {conversation.channel === "email" ? (
                            <Mail className="h-4 w-4 text-gray-500" />
                        ) : (
                            <MessageCircle className="h-4 w-4 text-green-500" />
                        )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {conversation.contact?.email || conversation.contact?.phone || "Sin contacto"}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500">{formattedDate}</span>
                    <Circle
                        className={`h-2 w-2 ${conversation.status ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400"
                            }`}
                    />
                </div>
            </div>
        </button>
    );
}
