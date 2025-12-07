import type { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task.types";
import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

/**
 * Servicio para gestión de tareas
 * Endpoints: /api/tasks (Admin y Agente)
 */
class TaskService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getAll(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.tasks.list}?limit=100`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener tareas");
      }

      const data = await response.json();
      return data.data.items || [];
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      throw error;
    }
  }

  async create(taskData: CreateTaskDto): Promise<Task> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.tasks.create}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(taskData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al crear tarea");
      }

      const data: ApiResponse<Task> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al crear tarea:", error);
      throw error;
    }
  }

  async update(id: string, taskData: UpdateTaskDto): Promise<Task> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.tasks.update(id)}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(taskData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar tarea");
      }

      const data: ApiResponse<Task> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.tasks.delete(id)}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al eliminar tarea");
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();
