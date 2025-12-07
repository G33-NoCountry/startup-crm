import { create } from "zustand";
import type { User, LoginCredentials, AuthError } from "@/types/auth.types";
import { authService } from "@/lib/api/authService";
import {
  saveToken,
  getToken,
  saveUser,
  getUser,
  clearAuthData,
  hasValidSession,
} from "@/lib/utils/tokenUtils";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginAttempts: number;
  isBlocked: boolean;

  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  clearError: () => void;
  resetLoginAttempts: () => void;
}

const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutos en milisegundos

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginAttempts: 0,
  isBlocked: false,

  login: async (credentials: LoginCredentials) => {
    const state = get();

    if (state.isBlocked) {
      set({
        error: "Demasiados intentos fallidos. Intenta nuevamente más tarde.",
      });
      return false;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(credentials);

      saveToken(response.data.access_token);
      saveUser(response.data.user);

      set({
        user: response.data.user,
        token: response.data.access_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        loginAttempts: 0,
        isBlocked: false,
      });
      
      return true;
    } catch (error) {
      const authError = error as AuthError;
      const newAttempts = state.loginAttempts + 1;

      let errorMessage = "Credenciales inválidas. Por favor, verifica tus datos.";

      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        errorMessage = `Demasiados intentos fallidos. Tu cuenta ha sido bloqueada temporalmente por ${BLOCK_DURATION / 60000} minutos.`;
        
        set({
          isLoading: false,
          error: errorMessage,
          loginAttempts: newAttempts,
          isBlocked: true,
        });

        setTimeout(() => {
          set({ isBlocked: false, loginAttempts: 0 });
        }, BLOCK_DURATION);
      } else {
        const attemptsLeft = MAX_LOGIN_ATTEMPTS - newAttempts;
        if (attemptsLeft <= 2) {
          errorMessage += ` Te quedan ${attemptsLeft} intentos.`;
        }

        set({
          isLoading: false,
          error: errorMessage,
          loginAttempts: newAttempts,
        });
      }

      console.error("Error en login:", authError);
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await authService.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      clearAuthData();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        loginAttempts: 0,
        isBlocked: false,
      });
    }
  },


  checkAuth: () => {
    const token = getToken();
    const user = getUser() as User | null;

    if (token && user && hasValidSession()) {
      set({
        user,
        token,
        isAuthenticated: true,
      });
    } else {
      clearAuthData();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },


  clearError: () => {
    set({ error: null });
  },

  resetLoginAttempts: () => {
    set({ loginAttempts: 0, isBlocked: false });
  },
}));
