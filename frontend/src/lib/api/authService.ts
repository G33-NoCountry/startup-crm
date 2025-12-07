import type { LoginCredentials, LoginResponse, RegisterResponse, AuthError } from "@/types/auth.types";
import { API_CONFIG } from "@/lib/config/api.config";

/**
 * Servicio de autenticación para comunicarse con el backend
 */
class AuthService {

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
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
        success: data.success,
        message: data.message,
        data: {
          user: data.data.user,
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
        },
      };
    } catch (error) {
      if (error && typeof error === "object" && "statusCode" in error) {
        throw error;
      }

      const authError: AuthError = {
        message: "Error de conexión. Verifica que el backend esté corriendo.",
        statusCode: 500,
      };
      throw authError;
    }
  }

  async register(data: { name: string; email: string; password: string }): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.register}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error: AuthError = {
          message: responseData.message || "Error al registrar usuario",
          statusCode: response.status,
        };
        throw error;
      }

      return {
        success: responseData.success,
        message: responseData.message,
        data: {
          user: responseData.data.user,
          access_token: responseData.data.access_token,
          refresh_token: responseData.data.refresh_token,
        },
      };
    } catch (error) {
      if (error && typeof error === "object" && "statusCode" in error) {
        throw error;
      }

      const authError: AuthError = {
        message: "Error de conexión. Verifica que el backend esté corriendo.",
        statusCode: 500,
      };
      throw authError;
    }
  }


  async logout(): Promise<void> {
    try {
      await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.logout}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }


  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.verify}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      return response.ok;
    } catch (error) {
      console.error("Error al verificar token:", error);
      return false;
    }
  }

  async getProfile(token: string) {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.profile}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(API_CONFIG.timeout),
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
