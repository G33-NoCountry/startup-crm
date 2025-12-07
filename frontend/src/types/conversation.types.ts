export type ConversationStatus = "open" | "closed" | "pending";
export type MessageType = "sent" | "received";

export interface Conversation {
  id: string;
  contact_id: string;
  subject: string;
  status: ConversationStatus;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  contact?: {
    id: string;
    full_name: string;
    email: string;
  };
  assigned_user?: {
    id: string;
    full_name: string;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  type: MessageType;
  content: string;
  sent_at: string;
  sender?: {
    id: string;
    full_name: string;
  };
}

export interface UpdateConversationStatusDto {
  status: ConversationStatus;
}
