/**
 * Configuración de API
 * 
 * - Frontend (Next.js): http://localhost:3000
 * - Backend: http://localhost:3001
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  
  endpoints: {
    auth: {
      login: "/api/auth/login",
      register: "/api/auth/register",
      logout: "/api/auth/logout",
      profile: "/api/auth/profile",
      verify: "/api/auth/verify",
    },
    users: {
      list: "/api/users",
      create: "/api/users",
      update: (id: string) => `/api/users/${id}`,
      delete: (id: string) => `/api/users/${id}`,
    },
    contacts: {
      list: "/api/contacts",
      create: "/api/contacts",
      update: (id: string) => `/api/contacts/${id}`,
      delete: (id: string) => `/api/contacts/${id}`,
    },
    deals: {
      list: "/api/deals",
      create: "/api/deals",
      update: (id: string) => `/api/deals/${id}`,
      delete: (id: string) => `/api/deals/${id}`,
    },
    tasks: {
      list: "/api/tasks",
      create: "/api/tasks",
      update: (id: string) => `/api/tasks/${id}`,
      delete: (id: string) => `/api/tasks/${id}`,
    },
    conversations: {
      list: "/api/conversations",
      create: "/api/conversations",
      update: (id: string) => `/api/conversations/${id}`,
      delete: (id: string) => `/api/conversations/${id}`,
    },
  },
  
  timeout: 10000,
} as const;
