"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Conversation, Message, ConversationChannel } from "@/types/conversation.types";
import { ConversationList } from "@/components/features/conversations/conversation-list";
import { ChatWindow } from "@/components/features/conversations/chat-window";
import { useAuthStore } from "@/store/authStore";

const mockEmailConversations: Conversation[] = [
  {
    id: 1,
    contact_id: 1,
    channel: 'email',
    status: true,
    last_interaction: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    contact: {
      id: 1,
      full_name: 'María González',
      email: 'maria.gonzalez@example.com',
      phone: '+5491198765432',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    contact_id: 2,
    channel: 'email',
    status: true,
    last_interaction: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    contact: {
      id: 2,
      full_name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+5491123456789',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    contact_id: 3,
    channel: 'email',
    status: true,
    last_interaction: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    contact: {
      id: 3,
      full_name: 'Ana Silva',
      email: 'ana.silva@example.com',
      phone: '+5491187654321',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      conversation_id: 1,
      sender_type: 'Contact',
      sender_id: 1,
      content: 'Hola, me gustaría conocer más sobre sus servicios de consultoría.',
      channel: 'email',
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    },
    {
      id: 2,
      conversation_id: 1,
      sender_type: 'User',
      sender_id: 1,
      content: '¡Hola María! Claro, con gusto te ayudo. Ofrecemos servicios de consultoría especializada en transformación digital.',
      channel: 'email',
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
      id: 3,
      conversation_id: 1,
      sender_type: 'Contact',
      sender_id: 1,
      content: 'Perfecto, ¿podríamos agendar una reunión para la próxima semana?',
      channel: 'email',
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    }
  ],
  2: [
    {
      id: 4,
      conversation_id: 2,
      sender_type: 'User',
      sender_id: 1,
      content: 'Hola Juan, te escribo para hacer seguimiento de nuestra propuesta comercial.',
      channel: 'email',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    },
    {
      id: 5,
      conversation_id: 2,
      sender_type: 'Contact',
      sender_id: 2,
      content: 'Hola, gracias por el seguimiento. Estamos evaluando la propuesta con el equipo.',
      channel: 'email',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    }
  ],
  3: [
    {
      id: 6,
      conversation_id: 3,
      sender_type: 'Contact',
      sender_id: 3,
      content: 'Buenos días, quisiera información sobre precios.',
      channel: 'email',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    }
  ]
};

function EmailPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  
  const conversationIdParam = searchParams.get("id");
  
  const [conversations, setConversations] = useState<Conversation[]>(mockEmailConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      
      setTimeout(() => {
        setConversations(mockEmailConversations);
        
        if (conversationIdParam) {
          const conv = mockEmailConversations.find(c => c.id === parseInt(conversationIdParam));
          if (conv) {
            setSelectedConversation(conv);
            setMessages(mockMessages[conv.id] || []);
          }
        } else if (mockEmailConversations.length > 0) {
          setSelectedConversation(mockEmailConversations[0]);
          setMessages(mockMessages[mockEmailConversations[0].id] || []);
        }
        
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error al cargar conversaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadMessages = async (conversationId: number) => {
    setTimeout(() => {
      const msgs = mockMessages[conversationId] || [];
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
            <span className="font-medium">Mails recientes</span>
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

export default function EmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    }>
      <EmailPageContent />
    </Suspense>
  );
}
