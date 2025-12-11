"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Conversation, Message, ConversationChannel } from "@/types/conversation.types";
import { ConversationList } from "@/components/features/conversations/conversation-list";
import { ChatWindow } from "@/components/features/conversations/chat-window";
import { useAuthStore } from "@/store/authStore";

const mockWhatsAppConversations: Conversation[] = [
  {
    id: 10,
    contact_id: 10,
    channel: 'whatsapp',
    status: true,
    last_interaction: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    contact: {
      id: 10,
      full_name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      phone: '+5491156789012',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 11,
    contact_id: 11,
    channel: 'whatsapp',
    status: true,
    last_interaction: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    contact: {
      id: 11,
      full_name: 'Laura Martínez',
      email: 'laura@example.com',
      phone: '+5491145678901',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 12,
    contact_id: 12,
    channel: 'whatsapp',
    status: true,
    last_interaction: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    contact: {
      id: 12,
      full_name: 'Roberto Fernández',
      email: 'roberto@example.com',
      phone: '+5491134567890',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockWhatsAppMessages: Record<number, Message[]> = {
  10: [
    {
      id: 101,
      conversation_id: 10,
      sender_type: 'Contact',
      sender_id: 10,
      content: 'Hola! Quisiera saber si tienen disponibilidad para una reunión',
      channel: 'whatsapp',
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      id: 102,
      conversation_id: 10,
      sender_type: 'User',
      sender_id: 1,
      content: '¡Hola Carlos! Claro, con gusto. ¿Qué día te viene mejor?',
      channel: 'whatsapp',
      created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
      id: 103,
      conversation_id: 10,
      sender_type: 'Contact',
      sender_id: 10,
      content: 'El jueves por la tarde me vendría perfecto',
      channel: 'whatsapp',
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    }
  ],
  11: [
    {
      id: 104,
      conversation_id: 11,
      sender_type: 'User',
      sender_id: 1,
      content: 'Hola Laura, te envío la información que me solicitaste',
      channel: 'whatsapp',
      created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 90).toISOString()
    },
    {
      id: 105,
      conversation_id: 11,
      sender_type: 'Contact',
      sender_id: 11,
      content: 'Perfecto, muchas gracias! 👍',
      channel: 'whatsapp',
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    }
  ],
  12: [
    {
      id: 106,
      conversation_id: 12,
      sender_type: 'Contact',
      sender_id: 12,
      content: 'Buenos días, necesito cotización urgente',
      channel: 'whatsapp',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    }
  ]
};

function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  
  const conversationIdParam = searchParams.get("id");
  
  const [conversations, setConversations] = useState<Conversation[]>(mockWhatsAppConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    setTimeout(() => {
      setConversations(mockWhatsAppConversations);
      
      if (conversationIdParam) {
        const conv = mockWhatsAppConversations.find(c => c.id === parseInt(conversationIdParam));
        if (conv) {
          setSelectedConversation(conv);
          setMessages(mockWhatsAppMessages[conv.id] || []);
        }
      } else if (mockWhatsAppConversations.length > 0) {
        setSelectedConversation(mockWhatsAppConversations[0]);
        setMessages(mockWhatsAppMessages[mockWhatsAppConversations[0].id] || []);
      }
      
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadMessages = async (conversationId: number) => {
    setTimeout(() => {
      const msgs = mockWhatsAppMessages[conversationId] || [];
      setMessages(msgs);
    }, 300);
  };

  const handleSendMessage = async (content: string, channel: ConversationChannel) => {
    if (!selectedConversation || !user) return;
    
    try {
      setSending(true);
      
      setTimeout(() => {
        const newMessage: Message = {
          id: Date.now(),
          conversation_id: selectedConversation.id,
          sender_type: 'User',
          sender_id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
          content,
          channel,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        const updatedConvs = conversations.map(c => 
          c.id === selectedConversation.id 
            ? { ...c, last_interaction: new Date().toISOString() }
            : c
        );
        setConversations(updatedConvs.sort((a, b) => 
          new Date(b.last_interaction).getTime() - new Date(a.last_interaction).getTime()
        ));
        
        setSending(false);
      }, 500);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (activeTab === "active") return conv.status === true;
    if (activeTab === "inactive") return conv.status === false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => router.push("/conversations")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Chats recientes</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "active"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Activas
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "inactive"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Inactivas
            </button>
          </div>
        </div>

        <ConversationList
          conversations={filteredConversations}
          activeConversationId={selectedConversation?.id || null}
          onSelectConversation={setSelectedConversation}
          loading={loading}
        />
      </div>

      <div className="flex-1">
        {selectedConversation && user ? (
          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            paginationInfo={null}
            onSendMessage={handleSendMessage}
            onLoadMore={() => {}}
            loading={false}
            sending={sending}
            currentUserId={typeof user.id === 'string' ? parseInt(user.id) : user.id}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              Selecciona una conversación para ver los mensajes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
}
