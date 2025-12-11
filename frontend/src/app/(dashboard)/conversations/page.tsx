"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { Conversation } from "@/types/conversation.types";
import { RecentChatsSection } from "@/components/features/conversations/recent-chats-section";
import { RecentMailsSection } from "@/components/features/conversations/recent-mails-section";
import { NewMessageModal } from "@/components/features/conversations/new-message-modal";
import { contactsApi } from "@/lib/api/contactService";
import { useRouter } from "next/navigation";

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
        try {
            setLoading(true);
            setError(null);

            const contactsData = await contactsApi.getContacts({ limit: 100 });
            const allConversations: Conversation[] = [];

            for (const contact of contactsData.items) {
                try {
                    const convData = await contactsApi.getConversations(contact.id);

                    // Manejar tanto la estructura con "edges" como con "items"
                    let conversations: any[] = [];

                    if (convData?.edges && Array.isArray(convData.edges)) {
                        // Estructura con edges (GraphQL style)
                        conversations = convData.edges.map((edge: any) => edge.node);
                    } else if (convData?.items && Array.isArray(convData.items)) {
                        // Estructura con items (REST style)
                        conversations = convData.items;
                    }

                    if (conversations.length > 0) {
                        const convWithContact = conversations.map((conv: any) => ({
                            ...conv,
                            contact: {
                                id: contact.id,
                                full_name: contact.full_name,
                                email: contact.email,
                                phone: contact.phone,
                            },
                        }));
                        allConversations.push(...convWithContact);
                    }
                } catch (error: any) {
                    if (error?.response?.status !== 404) {
                        console.error(`Error al cargar conversaciones del contacto ${contact.id}:`, error?.message || error);
                    }
                }
            }

            allConversations.sort((a, b) =>
                new Date(b.last_interaction).getTime() - new Date(a.last_interaction).getTime()
            );

            const chats = allConversations
                .filter(c => c.channel === "whatsapp")
                .slice(0, 4);

            const mails = allConversations
                .filter(c => c.channel === "email")
                .slice(0, 4);

            console.log('📊 Conversaciones cargadas:', {
                total: allConversations.length,
                chatsCount: chats.length,
                mailsCount: mails.length,
                allConversations,
                chatsData: chats,
                mailsData: mails
            });

            setRecentChats(chats);
            setRecentMails(mails);
        } catch (error) {
            console.error("Error al cargar conversaciones:", error);
            setError("Error al cargar las conversaciones. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
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