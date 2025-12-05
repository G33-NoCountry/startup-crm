import type { LoginCredentials, LoginResponse, AuthError } from "@/types/auth.types";
import { env } from "../config/env";

const API_BASE_URL = env.apiUrl;

/**
 * Servicio de autenticación para comunicarse con el backend
 */
class AuthService {

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const error: AuthError = {
          message: data.message || "Error al iniciar sesión",
          statusCode: response.status,
        };
        throw error;
      }

      return {
        success: true,
        message: data.message || "Login exitoso",
        data: {
          user: data.user || data.data?.user,
          access_token: data.access_token || data.data?.access_token,
        },
      };
    } catch (error) {
      if (error && typeof error === "object" && "statusCode" in error) {
        throw error;
      }

      const authError: AuthError = {
        message: "Error de conexión. Por favor, intenta nuevamente.",
        statusCode: 500,
      };
      throw authError;
    }
  }


  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }


  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Error al verificar token:", error);
      return false;
    }
  }

  async getProfile(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener perfil");
      }

      return await response.json();
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
