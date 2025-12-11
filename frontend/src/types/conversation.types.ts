// Tipos basados en el backend real
export type ConversationChannel = "email" | "whatsapp";
export type MessageSenderType = "User" | "Contact";

export interface Conversation {
  id: number;
  contact_id: number;
  status: boolean; // true = activa, false = inactiva
  channel: ConversationChannel;
  last_interaction: string;
  created_at: string;
  updated_at: string;
  contact?: {
    id: number;
    full_name: string;
    email: string;
    phone?: string;
  };
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_type: MessageSenderType;
  sender_id: number;
  content: string;
  channel: ConversationChannel;
  created_at: string;
  updated_at: string;
}

// DTOs para requests
export interface UpdateConversationStatusDto {
  status: boolean;
}

export interface SendMessageDto {
  content: string;
  channel: ConversationChannel;
}

// Response con paginación
export interface PaginatedMessages {
  edges: Array<{
    cursor: string;
    node: Message;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}

export interface PaginatedConversations {
  edges: Array<{
    cursor: string;
    node: Conversation;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}
