import { z } from "zod";
import { contactDbSchema } from "@/lib/validations/contact.schema";
import { env } from "@/lib/config/env";
import { getToken } from "@/lib/utils/tokenUtils";

// Schemas
const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    items: z.array(contactDbSchema),
    total_count: z.number(),
    paginate_info: z.object({
      has_next: z.boolean(),
      has_previous: z.boolean(),
      next_cursor: z.string().nullable(),
      prev_cursor: z.string().nullable(),
    }),
  }),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type Contact = z.infer<typeof contactDbSchema>;

// Tipos para parámetros de la API
export interface ContactsQueryParams {
  limit?: number;
  after?: string;
  before?: string;
  funnel_stage_id?: string;
}

// Error personalizado para manejar errores de autenticación
export class AuthenticationError extends Error {
  constructor(message: string = "No autenticado") {
    super(message);
    this.name = "AuthenticationError";
  }
}

// Construir query string desde objeto
function buildQueryString(params: ContactsQueryParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
}

/**
 * Obtener headers con autenticación
 */
function getAuthHeaders(): HeadersInit {
  const token = getToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Solo agregar Authorization si hay token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Cliente API
export class ContactsApi {
  private baseUrl: string;

  constructor(baseUrl: string = env.apiUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtener lista de contactos
   */
  async getContacts(params: ContactsQueryParams = {}): Promise<ApiResponse['data']> {
    const defaultParams: ContactsQueryParams = {
      limit: params.limit ?? env.defaultLimit,
      ...params,
    };

    const queryString = buildQueryString(defaultParams);
    const url = `${this.baseUrl}/api/contacts${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: getAuthHeaders(), // ← Aquí se incluye el token
    });

    // Manejar error 401 (No autorizado)
    if (response.status === 401) {
      throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const result = apiResponseSchema.parse(json);

    if (!result.success) {
      throw new Error(result.message || "Error al obtener contactos");
    }

    return result.data;
  }

  /**
   * Obtener contacto por ID
   */
  async getContactById(id: number): Promise<Contact> {
    const url = `${this.baseUrl}/api/contacts/${id}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: getAuthHeaders(), // ← Token incluido
    });

    if (response.status === 401) {
      throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return contactDbSchema.parse(json.data);
  }

  /**
   * Crear nuevo contacto
   */
  async createContact(contactData: Partial<Contact>): Promise<Contact> {
    const url = `${this.baseUrl}/api/contacts`;

    const response = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(), // ← Token incluido
      body: JSON.stringify(contactData),
    });

    if (response.status === 401) {
      throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return contactDbSchema.parse(json.data);
  }

  /**
   * Actualizar contacto
   */
  async updateContact(id: number, contactData: Partial<Contact>): Promise<Contact> {
    const url = `${this.baseUrl}/api/contacts/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: getAuthHeaders(), // ← Token incluido
      body: JSON.stringify(contactData),
    });

    if (response.status === 401) {
      throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return contactDbSchema.parse(json.data);
  }

  /**
   * Eliminar contacto
   */
  async deleteContact(id: number): Promise<void> {
    const url = `${this.baseUrl}/api/contacts/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(), // ← Token incluido
    });

    if (response.status === 401) {
      throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  }
}

// Instancia singleton
export const contactsApi = new ContactsApi();