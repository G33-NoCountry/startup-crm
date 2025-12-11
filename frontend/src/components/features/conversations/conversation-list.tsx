"use client";

import { Conversation } from "@/types/conversation.types";
import { ConversationListItem } from "./conversation-list-item";
import { Loader2 } from "lucide-react";

interface ConversationListProps {
    conversations: Conversation[];
    activeConversationId: number | null;
    onSelectConversation: (conversation: Conversation) => void;
    loading?: boolean;
}

export function ConversationList({
    conversations,
    activeConversationId,
    onSelectConversation,
    loading = false,
}: ConversationListProps) {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (conversations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <p className="text-gray-500 dark:text-gray-400">
                    No hay conversaciones disponibles
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Las conversaciones aparecerán aquí cuando los contactos envíen mensajes
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-y-auto h-full">
            {conversations.map((conversation) => (
                <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === activeConversationId}
                    onClick={() => onSelectConversation(conversation)}
                />
            ))}
        </div>
    );
}
