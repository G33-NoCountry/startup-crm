"use client";

import { useState, useEffect } from "react";
import { X, Search, Mail, MessageCircle, Loader2 } from "lucide-react";
import { ConversationChannel } from "@/types/conversation.types";
import { contactsApi } from "@/lib/api/contactService";
import { conversationService } from "@/lib/api/conversationService";

interface Contact {
    id: number;
    full_name: string;
    email: string | null;
    phone: string | null;
}

interface NewMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (conversationId: number) => void;
}

export function NewMessageModal({ isOpen, onClose, onSuccess }: NewMessageModalProps) {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [selectedChannel, setSelectedChannel] = useState<ConversationChannel>("whatsapp");
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadContacts();
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter(contact =>
                contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.phone?.includes(searchTerm)
            );
            setFilteredContacts(filtered);
        }
    }, [searchTerm, contacts]);

    const loadContacts = async () => {
        try {
            setLoading(true);
            const data = await contactsApi.getContacts({ limit: 100 });
            const mappedContacts = (data.items || []).map((c: any) => ({
                id: typeof c.id === 'string' ? parseInt(c.id) : c.id,
                full_name: c.full_name,
                email: c.email,
                phone: c.phone,
            }));
            setContacts(mappedContacts);
            setFilteredContacts(mappedContacts);
        } catch (error) {
            console.error("Error al cargar contactos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!selectedContact || !message.trim()) return;

        try {
            setSending(true);

            // Primero buscar si ya existe una conversación con este contacto
            const conversations = await contactsApi.getConversations(selectedContact.id);
            let conversationId: number | null = null;

            // Buscar conversación existente del canal seleccionado
            const existingConversations = (conversations as any)?.items || [];
            const existingConv = existingConversations.find(
                (c: any) => c.channel === selectedChannel
            );

            if (existingConv) {
                conversationId = existingConv.id;
            } else {
                // Si no existe, crear nueva conversación
                // Nota: Esto depende de si tu backend tiene un endpoint para crear conversaciones
                // Por ahora asumimos que al enviar el primer mensaje se crea automáticamente
                console.warn("No se encontró conversación existente. Se intentará crear al enviar.");
            }

            if (conversationId) {
                // Enviar mensaje a conversación existente
                await conversationService.sendMessage(conversationId, {
                    content: message,
                    channel: selectedChannel,
                });

                onSuccess(conversationId);
                handleClose();
            } else {
                // Si no hay conversación, mostrar error o crear una
                alert("No se puede enviar el mensaje. El contacto no tiene una conversación activa en este canal.");
            }
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
            alert("Error al enviar el mensaje. Intenta nuevamente.");
        } finally {
            setSending(false);
        }
    };

    const handleClose = () => {
        setSelectedContact(null);
        setMessage("");
        setSearchTerm("");
        setSelectedChannel("whatsapp");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Nuevo mensaje
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Para:
                        </label>
                        {selectedContact ? (
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {selectedContact.full_name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {selectedContact.email || selectedContact.phone}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedContact(null)}
                                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                                >
                                    Cambiar
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="relative mb-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Buscar contacto..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="border border-gray-200 dark:border-gray-600 rounded-lg max-h-48 overflow-y-auto">
                                    {loading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                                        </div>
                                    ) : filteredContacts.length === 0 ? (
                                        <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No se encontraron contactos
                                        </p>
                                    ) : (
                                        filteredContacts.map((contact) => (
                                            <button
                                                key={contact.id}
                                                onClick={() => setSelectedContact(contact)}
                                                className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                                            >
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {contact.full_name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {contact.email || contact.phone}
                                                </p>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {selectedContact && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Canal:
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedChannel("whatsapp")}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${selectedChannel === "whatsapp"
                                                ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400"
                                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                        WhatsApp
                                    </button>
                                    <button
                                        onClick={() => setSelectedChannel("email")}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${selectedChannel === "email"
                                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400"
                                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <Mail className="h-5 w-5" />
                                        Email
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Mensaje:
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escribe tu mensaje..."
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleClose}
                        disabled={sending}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!selectedContact || !message.trim() || sending}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {sending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            "Enviar mensaje"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
