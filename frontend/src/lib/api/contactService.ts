import type { Contact, CreateContactDto, UpdateContactDto, ContactConversation } from "@/types/contact.types";
import type { ApiResponse, PaginatedResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

/**
 * Servicio para gestión de contactos
 * Endpoints: /api/contacts
 */
class ContactService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getAll(): Promise<Contact[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts.list}?limit=100`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener contactos");
      }

      const data = await response.json();
      return data.data.items || [];
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Contact> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts.update(id)}`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener contacto");
      }

      const data: ApiResponse<Contact> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener contacto:", error);
      throw error;
    }
  }

  async create(contactData: CreateContactDto): Promise<Contact> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts.create}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(contactData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al crear contacto");
      }

      const data: ApiResponse<Contact> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al crear contacto:", error);
      throw error;
    }
  }

  async update(id: string, contactData: UpdateContactDto): Promise<Contact> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts.update(id)}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(contactData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar contacto");
      }

      const data: ApiResponse<Contact> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts.delete(id)}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al eliminar contacto");
      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      throw error;
    }
  }

  async getConversations(contactId: string): Promise<ContactConversation[]> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}/api/contacts/${contactId}/conversations?limit=100`,
        {
          method: "GET",
          headers: this.getHeaders(),
          signal: AbortSignal.timeout(API_CONFIG.timeout),
        }
      );

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener conversaciones");
      }

      const data = await response.json();
      // El backend retorna data.items en un objeto de paginación
      return data.data.items || [];
    } catch (error) {
      console.error("Error al obtener conversaciones del contacto:", error);
      throw error;
    }
  }
}

export const contactService = new ContactService();
