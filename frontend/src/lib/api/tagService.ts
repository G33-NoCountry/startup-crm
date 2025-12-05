import { z } from "zod";
import { tagDbSchema, tagFormSchema } from "@/lib/validations/tag.schema"; // Importamos los esquemas de Tag
import { env } from "@/lib/config/env";
import { getToken } from "@/lib/utils/tokenUtils";

// Schema para respuestas que incluyen PAGINACIÓN
const PaginatedApiResponseSchema     = z.object({
	success: z.boolean(),
	message: z.string(),
	data: z.object({
		// Utilizamos tagDbSchema para validar cada elemento de la lista
		items: z.array(tagDbSchema), 
		total_count: z.number(),
		paginate_info: z.object({
			has_next: z.boolean(),
			has_previous: z.boolean(),
			next_cursor: z.string().nullable(),
			prev_cursor: z.string().nullable(),
		}),
	}),
});

// Schema para respuestas de LISTA SIMPLE
const TagListApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string(),
	data: z.array(tagDbSchema), 
});

export type PaginatedApiResponse = z.infer<typeof PaginatedApiResponseSchema>;
export type Tag = z.infer<typeof tagDbSchema>;
export type TagFormData = z.infer<typeof tagFormSchema>; // Tipo para la data de creación/actualización

// Tipos para parámetros de la API
export interface TagsQueryParams {
	limit?: number;
	after?: string;
	before?: string;
	title?: string;
}

// Error personalizado
export class AuthenticationError extends Error {
	constructor(message: string = "No autenticado") {
		super(message);
		this.name = "AuthenticationError";
	}
}

// Construir query string desde objeto
function buildQueryString(params: TagsQueryParams): string {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			searchParams.append(key, String(value));
		}
	});
	return searchParams.toString();
}

// Obtener headers con autenticación
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
export class TagsApi {
    private baseUrl: string;

    constructor(baseUrl: string = env.apiUrl) {
        this.baseUrl = baseUrl;
    }

    // Obtener lista de tags
    async getTags(params: TagsQueryParams = {}): Promise<Tag[]> {
        const defaultParams: TagsQueryParams = {
        limit: params.limit ?? env.defaultLimit,
        ...params,
        };

        const queryString = buildQueryString(defaultParams);
        const url = `${this.baseUrl}/api/admin/tags${queryString ? `?${queryString}` : ''}`;

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
        // Validamos la respuesta con el esquema de Tags
        const result = TagListApiResponseSchema.parse(json); 

        if (!result.success) {
            throw new Error(result.message || "Error al obtener tags");
        }

        return result.data;
    }

    // Obtener tag por ID
    async getTagById(id: number | string): Promise<Tag> {
        const url = `${this.baseUrl}/api/tags/${id}`;

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
        // Usamos tagDbSchema para validar el objeto único
        return tagDbSchema.parse(json.data); 
    }

    // Crear nuevo tag
    async createTag(tagData: TagFormData): Promise<Tag> {
        const url = `${this.baseUrl}/api/admin/tags`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: getAuthHeaders(),
            // Usamos TagFormData que excluye 'id', 'created_at', etc.
            body: JSON.stringify(tagData), 
        });

        if (response.status === 401) {
            throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
        }

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        return tagDbSchema.parse(json.data);
    }

    // Actualizar tag
    async updateTag(id: number | string, tagData: TagFormData): Promise<Tag> {
        const url = `${this.baseUrl}/api/admin/tags/${id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: getAuthHeaders(),
            // Usamos TagFormData para la data a enviar
            body: JSON.stringify(tagData), 
        });

        if (response.status === 401) {
            throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
        }

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        return tagDbSchema.parse(json.data);
    }

    // Eliminar tag
    async deleteTag(id: number | string): Promise<void> {
        const url = `${this.baseUrl}/api/admin/tags/${id}`;

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
export const tagsApi = new TagsApi();