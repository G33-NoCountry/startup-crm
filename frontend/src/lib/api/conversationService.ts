import type { Conversation, Message, UpdateConversationStatusDto } from "@/types/conversation.types";
import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

/**
 * Servicio para gestión de conversaciones
 * Endpoints: /api/conversations (Admin y Agente)
 */
class ConversationService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/api/conversations/${conversationId}/messages`,
        {
          method: "GET",
          headers: this.getHeaders(),
          signal: AbortSignal.timeout(API_CONFIG.timeout),
        }
      );

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener mensajes");
      }

      const data: ApiResponse<Message[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
      throw error;
    }
  }

  async updateStatus(
    conversationId: string,
    statusData: UpdateConversationStatusDto
  ): Promise<Conversation> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/api/conversations/${conversationId}/status`,
        {
          method: "PATCH",
          headers: this.getHeaders(),
          body: JSON.stringify(statusData),
          signal: AbortSignal.timeout(API_CONFIG.timeout),
        }
      );

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar estado");
      }

      const data: ApiResponse<Conversation> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar estado de conversación:", error);
      throw error;
    }
  }
}

export const conversationService = new ConversationService();
