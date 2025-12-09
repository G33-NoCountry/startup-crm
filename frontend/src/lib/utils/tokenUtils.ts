import type { DecodedToken } from "@/types/auth.types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";


export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Intentar obtener el token con la nueva key
    let token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      const oldToken = localStorage.getItem("token");
      if (oldToken) {
        localStorage.setItem(TOKEN_KEY, oldToken);
        localStorage.removeItem("token");
        token = oldToken;
      }
    }
    
    return token;
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const saveUser = (user: unknown): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): unknown | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const removeUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
};

export const clearAuthData = (): void => {
  removeToken();
  removeUser();
};

/**
 * Decodifica el token JWT (sin verificar firma)
 * NOTA: Esto es solo para leer datos, NO para validar el token
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
};


export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // exp viene en segundos, Date.now() en milisegundos
  const currentTime = Date.now() / 1000;
  const isExpired = decoded.exp < currentTime;
  
  return isExpired;
};

export const hasValidSession = (): boolean => {
  const token = getToken();
  if (!token) {
    return false;
  }
  return !isTokenExpired(token);
};


export const getTokenExpirationTime = (token: string): number => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return 0;
  }

  const currentTime = Date.now() / 1000;
  const timeRemaining = decoded.exp - currentTime;
  return Math.floor(timeRemaining / 60); 
};
