import type { User, CreateUserDto, UpdateUserDto } from "@/types/user.types";
import type { Tag, CreateTagDto, UpdateTagDto } from "@/types/tag.types";
import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

/**
 * Servicio para funciones administrativas
 * Endpoints: /api/admin/* (solo Admin)
 */
class AdminService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/users?limit=100`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener usuarios");
      }

      const data = await response.json();
      // El backend retorna data.items en un objeto de paginación
      return data.data.items || [];
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const { status, ...userDataWithoutStatus } = userData;
      
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/users`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(userDataWithoutStatus),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al crear usuario");
      }

      const data: ApiResponse<User> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar usuario");
      }

      const data: ApiResponse<User> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }


  async getAllTags(): Promise<Tag[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/tags`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener tags");
      }

      const data: ApiResponse<Tag[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener tags:", error);
      throw error;
    }
  }

  async createTag(tagData: CreateTagDto): Promise<Tag> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/tags`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(tagData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al crear tag");
      }

      const data: ApiResponse<Tag> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al crear tag:", error);
      throw error;
    }
  }

  async updateTag(id: string, tagData: UpdateTagDto): Promise<Tag> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/tags/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(tagData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar tag");
      }

      const data: ApiResponse<Tag> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar tag:", error);
      throw error;
    }
  }

  async deleteTag(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/tags/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al eliminar tag");
      }
    } catch (error) {
      console.error("Error al eliminar tag:", error);
      throw error;
    }
  }
}

export const adminService = new AdminService();
