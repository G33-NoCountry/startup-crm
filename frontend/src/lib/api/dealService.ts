import type { Deal, CreateDealDto, UpdateDealDto, MoveDealStageDto, DealPipeline } from "@/types/deal.types";
import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

/**
 * Servicio para gestión de deals (pipeline de ventas)
 * Endpoints: /api/deals
 */
class DealService {
  private getHeaders(): HeadersInit {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getAll(): Promise<Deal[]> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.deals.list}`, {
        method: "GET",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al obtener deals");
      }

      const data: ApiResponse<Deal[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener deals:", error);
      throw error;
    }
  }

  async getPipeline(): Promise<DealPipeline> {
    try {
      const deals = await this.getAll();
      
      const pipeline: DealPipeline = {
        lead: [],
        qualified: [],
        proposal: [],
        negotiation: [],
        closed_won: [],
        closed_lost: [],
      };

      deals.forEach((deal) => {
        if (pipeline[deal.stage]) {
          pipeline[deal.stage].push(deal);
        }
      });

      return pipeline;
    } catch (error) {
      console.error("Error al obtener pipeline:", error);
      throw error;
    }
  }

  async create(dealData: CreateDealDto): Promise<Deal> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.deals.create}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(dealData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al crear deal");
      }

      const data: ApiResponse<Deal> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al crear deal:", error);
      throw error;
    }
  }

  async update(id: string, dealData: UpdateDealDto): Promise<Deal> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.deals.update(id)}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(dealData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al actualizar deal");
      }

      const data: ApiResponse<Deal> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al actualizar deal:", error);
      throw error;
    }
  }

  async moveStage(id: string, stageData: MoveDealStageDto): Promise<Deal> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/deals/${id}/funnel-stage`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(stageData),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al mover deal");
      }

      const data: ApiResponse<Deal> = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al mover deal a otra etapa:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.deals.delete(id)}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || "Error al eliminar deal");
      }
    } catch (error) {
      console.error("Error al eliminar deal:", error);
      throw error;
    }
  }
}

export const dealService = new DealService();
