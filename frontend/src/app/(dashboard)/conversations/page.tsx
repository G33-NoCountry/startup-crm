"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { Conversation } from "@/types/conversation.types";
import { RecentChatsSection } from "@/components/features/conversations/recent-chats-section";
import { RecentMailsSection } from "@/components/features/conversations/recent-mails-section";
import { NewMessageModal } from "@/components/features/conversations/new-message-modal";
import { useRouter } from "next/navigation";
import { mockConversations } from "@/lib/mocks/conversationsMock";

export default function ConversationsPage() {
    const router = useRouter();
    const [recentChats, setRecentChats] = useState<Conversation[]>([]);
    const [recentMails, setRecentMails] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNewMessageModal, setShowNewMessageModal] = useState(false);

    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = async () => {
        setLoading(true);
        setError(null);
        
        setTimeout(() => {
            const chats = mockConversations
                .filter(c => c.channel === "whatsapp")
                .slice(0, 4);
            
            const mails = mockConversations
                .filter(c => c.channel === "email")
                .slice(0, 4);

            setRecentChats(chats);
            setRecentMails(mails);
            setLoading(false);
        }, 500);
    };

    const handleViewAllChats = () => {
        router.push("/conversations/chat");
    };

    const handleViewAllMails = () => {
        router.push("/conversations/email");
    };

    const handleNewMessage = () => {
        setShowNewMessageModal(true);
    };

    const handleNewMessageSuccess = (conversationId: number) => {
        // Navegar a la conversación creada
        router.push(`/conversations/email?id=${conversationId}`);
    };

    return (
        <>
            <NewMessageModal
                isOpen={showNewMessageModal}
                onClose={() => setShowNewMessageModal(false)}
                onSuccess={handleNewMessageSuccess}
            />

            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Conversaciones
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Gestiona tus chats o emails dentro de la plataforma.
                        </p>
                    </div>
                    <button
                        onClick={handleNewMessage}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                    >
                        <Plus className="h-5 w-5" />
                        Nuevo mensaje
                    </button>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Mis conversaciones
                    </h2>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando conversaciones...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <p className="text-red-800 dark:text-red-200">{error}</p>
                        <button
                            onClick={loadConversations}
                            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <RecentChatsSection
                            conversations={recentChats}
                            onViewAll={handleViewAllChats}
                        />

                        <RecentMailsSection
                            conversations={recentMails}
                            onViewAll={handleViewAllMails}
                        />
                    </>
                )}
            </div>
        </>
    );
}