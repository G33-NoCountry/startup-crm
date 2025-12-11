import { Message } from "@/types/conversation.types";
import { Mail, MessageCircle } from "lucide-react";

interface MessageBubbleProps {
    message: Message;
    isFromUser: boolean;
}

export function MessageBubble({ message, isFromUser }: MessageBubbleProps) {
    const formattedDate = new Date(message.created_at).toLocaleString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
    });

    return (
        <div className={`flex ${isFromUser ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${isFromUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    }`}
            >
                <div className="flex items-center gap-2 mb-1">
                    {message.channel === "email" ? (
                        <Mail className="h-3 w-3 opacity-70" />
                    ) : (
                        <MessageCircle className="h-3 w-3 opacity-70" />
                    )}
                    <span className="text-xs opacity-70">{formattedDate}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap break-word">{message.content}</p>
            </div>
        </div>
    );
}
