"use client";

import { useState, useEffect, useRef } from "react";
import { Conversation, Message, PaginatedMessages, ConversationChannel } from "@/types/conversation.types";
import { MessageBubble } from "./message-bubble";
import { Send, Loader2, Mail, MessageCircle } from "lucide-react";

interface ChatWindowProps {
    conversation: Conversation;
    messages: Message[];
    paginationInfo: PaginatedMessages["pageInfo"] | null;
    onSendMessage: (content: string, channel: ConversationChannel) => Promise<void>;
    onLoadMore: () => void;
    loading?: boolean;
    sending?: boolean;
    currentUserId: number;
}

export function ChatWindow({
    conversation,
    messages,
    paginationInfo,
    onSendMessage,
    onLoadMore,
    loading = false,
    sending = false,
    currentUserId,
}: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState("");
    const [selectedChannel, setSelectedChannel] = useState<ConversationChannel>(conversation.channel);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!newMessage.trim() || sending) return;

        try {
            await onSendMessage(newMessage.trim(), selectedChannel);
            setNewMessage("");
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {conversation.contact?.full_name || "Sin nombre"}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {conversation.contact?.email || conversation.contact?.phone || "Sin contacto"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${conversation.status
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            }`}>
                            {conversation.status ? "Activa" : "Inactiva"}
                        </span>
                    </div>
                </div>
            </div>

            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900"
            >
                {paginationInfo?.hasPreviousPage && (
                    <button
                        onClick={onLoadMore}
                        className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                        Cargar mensajes anteriores
                    </button>
                )}

                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            No hay mensajes en esta conversación. ¡Envía el primero!
                        </p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            isFromUser={message.sender_type === "User" && message.sender_id === currentUserId}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => setSelectedChannel("email")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedChannel === "email"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                        disabled={!conversation.contact?.email}
                        title={!conversation.contact?.email ? "El contacto no tiene email" : ""}
                    >
                        <Mail className="h-4 w-4" />
                        Email
                    </button>
                    <button
                        onClick={() => setSelectedChannel("whatsapp")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedChannel === "whatsapp"
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                        disabled={!conversation.contact?.phone}
                        title={!conversation.contact?.phone ? "El contacto no tiene teléfono" : ""}
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </button>
                </div>

                <div className="flex gap-2">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={`Escribe un mensaje (${selectedChannel === "email" ? "Email" : "WhatsApp"})...`}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        rows={3}
                        disabled={sending}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!newMessage.trim() || sending}
                        className="px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {sending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
