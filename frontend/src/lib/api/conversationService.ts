import type { 
  Conversation, 
  Message, 
  UpdateConversationStatusDto, 
  SendMessageDto,
  PaginatedMessages 
} from "@/types/conversation.types";
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

  /**
   * Obtener mensajes de una conversación con paginación
   * @param conversationId - ID de la conversación
   * @param limit - Cantidad de mensajes a obtener
   * @param before - Fecha para obtener mensajes anteriores (paginación)
   */
  async getMessages(
    conversationId: number, 
    limit: number = 50,
    before?: string
  ): Promise<PaginatedMessages> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(before && { before }),
      });

      const response = await fetch(
        `${API_CONFIG.baseURL}/api/conversations/${conversationId}/messages?${params}`,
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

      const data: ApiResponse<PaginatedMessages> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
      throw error;
    }
  }

  /**
   * Enviar un mensaje a través de email o whatsapp
   * @param conversationId - ID de la conversación
   * @param messageData - Datos del mensaje (contenido y canal)
   */
  async sendMessage(
    conversationId: number,
    messageData: SendMessageDto
  ): Promise<Message> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: this.getHeaders(),
          body: JSON.stringify(messageData),
          signal: AbortSignal.timeout(API_CONFIG.timeout),
        }
      );

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al enviar mensaje");
      }

      const data: ApiResponse<Message> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      throw error;
    }
  }

  /**
   * Actualizar estado de una conversación
   * @param conversationId - ID de la conversación
   * @param statusData - Nuevo estado (true = activa, false = inactiva)
   */
  async updateStatus(
    conversationId: number,
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
