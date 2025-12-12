import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

export interface DashboardMetrics {
  activeLeads: number;
  conversations: number;
  conversationsToday?: number;
  conversionRate: number;
  totalContacts: number;
  activeLeadsTrend?: number;
  conversationsTrend?: number;
  conversionRateTrend?: number;
  totalContactsTrend?: number;
  pipelineValue?: number;
  monthSales?: number;
  dealsConversionRate?: number;
  avgDealValue?: number;
}

export interface FunnelProgress {
  stage: string;
  count: number;
  value: number;
}

export interface PendingTask {
  id: number;
  title: string;
  description?: string;
  due_date: string;
  priority: string;
  status: string;
  contact?: {
    id: number;
    full_name: string;
  };
}

export interface RecentActivity {
  id: number;
  type: string;
  description: string;
  created_at: string;
  user?: {
    id: number;
    full_name: string;
  };
}

class DashboardService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getMetrics(): Promise<DashboardMetrics> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/dashboard/metrics`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener métricas");
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error al obtener métricas:", error);
      throw error;
    }
  }

  async getFunnelProgress(): Promise<FunnelProgress[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/dashboard/funnel-progress`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener progreso del funnel");
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error al obtener funnel progress:", error);
      throw error;
    }
  }

  async getPendingTasks(): Promise<PendingTask[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/dashboard/pending-tasks`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener tareas pendientes");
      }

      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error al obtener tareas pendientes:", error);
      throw error;
    }
  }

  async getRecentActivity(): Promise<RecentActivity[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/dashboard/recent-activity`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener actividad reciente");
      }

      const data: ApiResponse<RecentActivity[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener actividad reciente:", error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
