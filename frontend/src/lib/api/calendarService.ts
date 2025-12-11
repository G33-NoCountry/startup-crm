import { CalendarEvent, CreateCalendarEventDto, UpdateCalendarEventDto } from '@/types/calendar.types'
import { getToken } from '@/lib/utils/tokenUtils' // Asumiendo esta ruta
import { env } from '@/lib/config/env' // Asumiendo esta ruta
import { AuthenticationError } from './contactService' // Reutilizamos el error de autenticación
import { z } from 'zod'

// --- Definiciones de Tipos de API (adaptadas del paso 1) ---

// 1. Esquema de datos de una Task tal como viene del backend
const taskApiSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  start_date: z.string().datetime(), // Usaremos 'start' para el calendario
  due_date: z.string().datetime(), // Usaremos 'end' para el calendario
  color: z.string(), // Coincide con el tipo de color del calendario
  status: z.boolean(),
  contact_id: z.number().int().nullable().optional(), 
  deal_id: z.number().int().nullable().optional(),
});

// 2. Esquema de respuesta para la lista (sin paginación)
const TaskListApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(taskApiSchema),
});

type TaskApiData = z.infer<typeof taskApiSchema>;

// Tipo para parámetros de consulta
interface TasksQueryParams {
  status: boolean; // Requerido: debe ser true o false
  date_from?: string;
  date_to?: string;
}

// Tipo de dato para el payload de la API de creación/actualización de Tareas
interface TaskApiPayload {
  title: string;
  start_date: string;
  due_date: string;
  color: string;
  status: boolean;
  contact_id?: number | null; // Acepta number para el ID o null para limpiar la relación
  deal_id?: number | null; // Acepta number para el ID o null para limpiar la relación
}

// --- Funciones Auxiliares (como en contactService.ts) ---

function getAuthHeaders(): HeadersInit {
  const token = getToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

function buildQueryString(params: TasksQueryParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convertir booleanos a string 'true' o 'false' para la URL
      const stringValue = typeof value === 'boolean' ? String(value) : String(value);
      searchParams.append(key, stringValue);
    }
  });
  return searchParams.toString();
}

// --- Función de Mapeo para adaptar la Task al CalendarEvent ---

/**
 * Mapea el objeto Task del backend a nuestro tipo CalendarEvent.
 * @param task Objeto Task del backend.
 * @returns Objeto CalendarEvent para el frontend.
 */
function mapTaskToCalendarEvent(task: TaskApiData): CalendarEvent {
  return {
    id: String(task.id), // Usamos String() por si el ID del calendario espera string
    title: task.title,
    start: new Date(task.start_date), // Convertir string ISO a objeto Date
    end: new Date(task.due_date), // Convertir string ISO a objeto Date
    color: task.color,
    contact_id: task.contact_id,
    deal_id: task.deal_id
  };
}


// Tipo para el contexto de consulta que usa TanStack Query (para referencia)
interface QueryContext {
  queryKey: string[];
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
}

// --- Lógica del Servicio API Real (Actualizado) ---

const API_TASK_URL = `${env.apiUrl}/api/tasks`

/**
 * Obtiene todos los eventos (Tasks) del calendario.
 * Por defecto, filtra por `status=true` (activo).
 * @param filters Filtros de fecha (date_from, date_to) opcionales.
 */
export async function getCalendarEvents(context?: QueryContext): Promise<CalendarEvent[]> {
  // Los filtros de fecha (date_from, date_to) deben ser manejados aquí si fueran dinámicos.
  // Como el hook useCalendarEvents no recibe argumentos, usamos una estructura de filtros fija
  // o asumimos que la API debe devolver tareas relevantes sin fechas específicas,
  // o podemos usar la fecha actual del calendario para filtrar.

  // Por ahora, solo usamos el status requerido:
  const defaultParams: TasksQueryParams = {
    status: true, // REQUERIDO: Solo obtener tareas activas
    // Si quisieras pasar los filtros date_from/date_to aquí:
    // date_from: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    // date_to: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
  };

  const queryString = buildQueryString(defaultParams as any); // Usamos 'as any' si la función buildQueryString es muy estricta con el tipado de entrada.
  const url = `${API_TASK_URL}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: getAuthHeaders(),
      // Opcional: pasar el signal de cancelación al fetch
      signal: context?.signal, 
    });

    if (response.status === 401) {
      throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const result = TaskListApiResponseSchema.parse(json);

    
    if (!result.success) {
      throw new Error(result.message || "Error al obtener tareas");
    }
    
    return result.data.map(mapTaskToCalendarEvent); 

  } catch (error) {
    //console.error("Error en getCalendarEvents:", error);
    throw error;
  }
}

/**
 * Crea un nuevo evento (Task).
 * Se requiere adaptar el CalendarEvent al formato del API Task.
 */
export async function createCalendarEvent(
  data: CreateCalendarEventDto
): Promise<CalendarEvent> {
  const url = API_TASK_URL;
  
  // Mapeo de CalendarEvent a Task API
  const taskData: TaskApiPayload = {
    title: data.title,
    start_date: new Date(data.start).toISOString(), // Usar ISO string
    due_date: new Date(data.end).toISOString(), // Usar ISO string
    color: data.color,
    status: true, // Asumimos que los nuevos eventos están activos
  };

  // Agregar campos opcionales solo si están definidos
  if (data.contact_id) {
    taskData.contact_id = Number(data.contact_id);
  }
  if (data.deal_id) {
    taskData.deal_id = Number(data.deal_id);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  if (response.status === 401) {
    throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  const createdTask = taskApiSchema.parse(json.data); // Asumimos que la respuesta trae la tarea creada en data

  return mapTaskToCalendarEvent(createdTask);
}

/**
 * Actualiza un evento (Task) existente.
 */
export async function updateCalendarEvent(
  eventId: string,
  data: UpdateCalendarEventDto
): Promise<CalendarEvent> {
  const url = `${API_TASK_URL}/${eventId}`;
  
  // Mapeo de CalendarEvent a Task API
  const taskData: TaskApiPayload = {
    title: data.title,
    start_date: new Date(data.start).toISOString(),
    due_date: new Date(data.end).toISOString(),
    color: data.color,
    status: true, // Mantenemos el status, o lo obtenemos de la tarea original si fuera necesario
  };

  // Lógica para incluir/limpiar campos opcionales
  
  // Si contact_id viene definido, lo incluimos (como número o null si es string vacío para limpiar)
  if (data.contact_id !== undefined) {
      taskData.contact_id = data.contact_id ? Number(data.contact_id) : null;
  }
  
  // Si deal_id viene definido, lo incluimos (como número o null si es string vacío para limpiar)
  if (data.deal_id !== undefined) {
      taskData.deal_id = data.deal_id ? Number(data.deal_id) : null;
  }

  const response = await fetch(url, {
    method: "PATCH", // Usamos PATCH según tus rutas
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });

  if (response.status === 401) {
    throw new AuthenticationError("Sesión expirada. Por favor, inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();
  const updatedTask = taskApiSchema.parse(json.data); // Asumimos que la respuesta trae la tarea actualizada

  return mapTaskToCalendarEvent(updatedTask);
}

/**
 * Elimina un evento (Task).
 */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const url = `${API_TASK_URL}/${eventId}`;

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