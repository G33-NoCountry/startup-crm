"use client";

import { useState, useEffect } from "react";
import { Conversation, Message } from "@/types/conversation.types";
import { ConversationCard } from "./conversation-card";
import { conversationService } from "@/lib/api/conversationService";
import { useRouter } from "next/navigation";

interface RecentChatsSectionProps {
  conversations: Conversation[];
  onViewAll: () => void;
}

export function RecentChatsSection({ conversations, onViewAll }: RecentChatsSectionProps) {
  const router = useRouter();
  const [lastMessages, setLastMessages] = useState<Record<number, string>>({});

  // Cargar el último mensaje de cada conversación
  useEffect(() => {
    const loadLastMessages = async () => {
      const messages: Record<number, string> = {};
      
      for (const conv of conversations) {
        try {
          const data = await conversationService.getMessages(conv.id, 1);
          
          // Manejar tanto estructura con "edges" como con "items"
          let lastMsg = null;
          
          if (data?.edges && data.edges.length > 0) {
            lastMsg = data.edges[data.edges.length - 1].node;
          } else if ((data as any)?.items && (data as any).items.length > 0) {
            lastMsg = (data as any).items[(data as any).items.length - 1];
          }
          
          if (lastMsg) {
            messages[conv.id] = lastMsg.content;
          }
        } catch (error) {
          console.error(`Error al cargar mensaje de conversación ${conv.id}:`, error);
        }
      }
      
      setLastMessages(messages);
    };

    if (conversations.length > 0) {
      loadLastMessages();
    }
  }, [conversations]);

  const handleConversationClick = (conversation: Conversation) => {
    router.push(`/conversations/chat?id=${conversation.id}`);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Chats recientes
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Ver más
        </button>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No hay chats recientes
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              lastMessage={lastMessages[conversation.id]}
              onClick={() => handleConversationClick(conversation)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
