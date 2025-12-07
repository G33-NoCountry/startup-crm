import type { User, UpdateProfileDto, ChangePasswordDto } from "@/types/user.types";
import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

/**
 * Servicio para gestión de perfil de usuario
 * Endpoints: /api/users/me
 */
class UserService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getProfile(): Promise<User> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/users/me`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener perfil");
      }

      const data: ApiResponse<User> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      throw error;
    }
  }

  async updateProfile(profileData: UpdateProfileDto): Promise<User> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/users/me`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar perfil");
      }

      const data: ApiResponse<User> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      throw error;
    }
  }

  async changePassword(passwordData: ChangePasswordDto): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/users/me/password`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(passwordData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al cambiar contraseña");
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
