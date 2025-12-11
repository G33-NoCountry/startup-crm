import { Conversation, Message } from "@/types/conversation.types";

// Mock de conversaciones para testing
export const mockConversations: Conversation[] = [
  {
    id: 1,
    contact_id: 1,
    status: true,
    channel: "whatsapp",
    last_interaction: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // hace 5 min
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    contact: {
      id: 1,
      full_name: "Carolina Díaz",
      email: "carolina.diaz@example.com",
      phone: "+54 11 1234-5678",
    },
  },
  {
    id: 2,
    contact_id: 2,
    status: true,
    channel: "whatsapp",
    last_interaction: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    contact: {
      id: 2,
      full_name: "Juan Cebrino",
      email: "juan.cebrino@example.com",
      phone: "+54 11 2345-6789",
    },
  },
  {
    id: 3,
    contact_id: 3,
    status: true,
    channel: "whatsapp",
    last_interaction: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    contact: {
      id: 3,
      full_name: "Melanie Ceballos",
      email: "melanie.ceballos@example.com",
      phone: "+54 11 3456-7890",
    },
  },
  {
    id: 4,
    contact_id: 4,
    status: true,
    channel: "whatsapp",
    last_interaction: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    contact: {
      id: 4,
      full_name: "Irene Lis",
      email: "irene.lis@example.com",
      phone: "+54 11 4567-8901",
    },
  },
  {
    id: 5,
    contact_id: 5,
    status: true,
    channel: "email",
    last_interaction: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    contact: {
      id: 5,
      full_name: "Juana Martita",
      email: "juana.martita@example.com",
    },
  },
  {
    id: 6,
    contact_id: 6,
    status: true,
    channel: "email",
    last_interaction: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    contact: {
      id: 6,
      full_name: "Juan Cruz Miñares",
      email: "juan.cruz@example.com",
    },
  },
  {
    id: 7,
    contact_id: 7,
    status: true,
    channel: "email",
    last_interaction: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    contact: {
      id: 7,
      full_name: "Evelyn Frías",
      email: "evelyn.frias@example.com",
    },
  },
  {
    id: 8,
    contact_id: 8,
    status: true,
    channel: "email",
    last_interaction: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    contact: {
      id: 8,
      full_name: "Li Purdeol",
      email: "li.purdeol@example.com",
    },
  },
];

// Mock de mensajes por conversación
export const mockMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      conversation_id: 1,
      sender_type: "Contact",
      sender_id: 1,
      content: "Hola, necesito información sobre...",
      channel: "whatsapp",
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      conversation_id: 1,
      sender_type: "User",
      sender_id: 1,
      content: "¡Hola María! Claro, te ayudo. Ofrecemos servicios de consultoría estratégica, transformación digital y optimización de procesos.",
      channel: "whatsapp",
      created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      conversation_id: 1,
      sender_type: "Contact",
      sender_id: 1,
      content: "Perfecto, ¿podrían enviarme más detalles y precios?",
      channel: "whatsapp",
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ],
  2: [
    {
      id: 4,
      conversation_id: 2,
      sender_type: "Contact",
      sender_id: 2,
      content: "Gracias por la atención",
      channel: "whatsapp",
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ],
  3: [
    {
      id: 5,
      conversation_id: 3,
      sender_type: "Contact",
      sender_id: 3,
      content: "¿Cuándo estará disponible el producto?",
      channel: "whatsapp",
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ],
  4: [
    {
      id: 6,
      conversation_id: 4,
      sender_type: "Contact",
      sender_id: 4,
      content: "Me gustaría agendar una reunión",
      channel: "whatsapp",
      created_at: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    },
  ],
  5: [
    {
      id: 7,
      conversation_id: 5,
      sender_type: "Contact",
      sender_id: 5,
      content: "Hola, necesito información sobre...",
      channel: "email",
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ],
  6: [
    {
      id: 8,
      conversation_id: 6,
      sender_type: "Contact",
      sender_id: 6,
      content: "Gracias, recibida la información",
      channel: "email",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
  7: [
    {
      id: 9,
      conversation_id: 7,
      sender_type: "Contact",
      sender_id: 7,
      content: "Necesito un poco más de servicios para mi compañía",
      channel: "email",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
  8: [
    {
      id: 10,
      conversation_id: 8,
      sender_type: "Contact",
      sender_id: 8,
      content: "Me gustaría saber que pueden ofrecer para mi produ...",
      channel: "email",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

// Función helper para obtener el último mensaje de una conversación
export function getLastMessage(conversationId: number): string {
  const messages = mockMessages[conversationId];
  if (!messages || messages.length === 0) return "Sin mensajes";
  return messages[messages.length - 1].content;
}

// Función helper para obtener tiempo relativo
export function getRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Ahora";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return past.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}
