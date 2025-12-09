import { z } from "zod";
import { contactDbSchema, contactFormSchema } from "@/lib/validations/contact.schema";
import { env } from "@/lib/config/env";
import { getToken } from "@/lib/utils/tokenUtils";

// Schema para respuestas que incluyen PAGINACIÓN
const PaginatedApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    // Utilizamos tagDbSchema para validar cada elemento de la lista
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

export type PaginatedApiResponse = z.infer<typeof PaginatedApiResponseSchema>;
export type Contact = z.infer<typeof contactDbSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>; // Tipo para la data de creación/actualización

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

  // Obtener lista de contactos
  async getContacts(params: ContactsQueryParams = {}): Promise<PaginatedApiResponse['data']> {// AQUI TENEMOS CAMBIOS CON TAGS
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
    const result = PaginatedApiResponseSchema.parse(json);

    if (!result.success) {
      throw new Error(result.message || "Error al obtener contactos");
    }

    return result.data;
  }

  // Obtener contacto por ID
  async getContactById(id: number | string): Promise<Contact> {
    const url = `${this.baseUrl}/api/contacts/${id}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: getAuthHeaders(),
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

  // Crear nuevo contacto
  async createContact(contactData: ContactFormData): Promise<Contact> {
    const url = `${this.baseUrl}/api/contacts`;

    const response = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
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

  // Actualizar contacto
  async updateContact(id: number | string, contactData: ContactFormData): Promise<Contact> {
    const url = `${this.baseUrl}/api/contacts/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: getAuthHeaders(),
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
  async deleteContact(id: number | string): Promise<void> {
    const url = `${this.baseUrl}/api/contacts/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(),
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
