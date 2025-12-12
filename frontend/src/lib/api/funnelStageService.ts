import type { ApiResponse, ApiError } from "@/types/api.types";
import { API_CONFIG } from "@/lib/config/api.config";
import { getToken } from "@/lib/utils/tokenUtils";

export interface FunnelStage {
    id: number;
    title: string;
    sort_order: number;
    is_closed: boolean;
    created_at: string;
    updated_at: string;
}

class FunnelStageService {
    private getHeaders(): HeadersInit {
        const token = getToken();
        return {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    async getAll(): Promise<FunnelStage[]> {
        try {
            const response = await fetch(`${API_CONFIG.baseURL}/api/funnel-stages`, {
                method: "GET",
                headers: this.getHeaders(),
                signal: AbortSignal.timeout(API_CONFIG.timeout),
            });

            if (!response.ok) {
                const error: ApiError = await response.json();
                throw new Error(error.message || "Error al obtener etapas del funnel");
            }

            const data: ApiResponse<FunnelStage[]> = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error al obtener funnel stages:", error);
            throw error;
        }
    }
}

export const funnelStageService = new FunnelStageService();
