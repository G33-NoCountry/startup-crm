export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";
export type DealPriority = "low" | "medium" | "high";

export interface FunnelStage {
  id: number;
  title: string;
  sort_order: number;
  is_closed: boolean;
}

export interface Deal {
  id: string | number;
  title: string;
  description?: string;
  value: number;
  currency?: string;
  stage?: DealStage;
  priority?: DealPriority;
  contact_id?: string | number;
  assigned_to?: string | number;
  expected_close_date?: string;
  probability?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  funnel_stage?: FunnelStage;
  contact?: {
    id: string | number;
    full_name: string;
    email: string;
    company?: string;
  };
  user?: {
    id: string | number;
    full_name: string;
    avatar_color?: string;
  };
}

export interface CreateDealDto {
  title: string;
  description?: string;
  value: number;
  currency?: string;
  stage?: DealStage;
  priority?: DealPriority;
  contact_id: string;
  assigned_to?: string;
  expected_close_date?: string;
  probability?: number;
  notes?: string;
}

export interface UpdateDealDto {
  title?: string;
  description?: string;
  value?: number;
  currency?: string;
  stage?: DealStage;
  priority?: DealPriority;
  contact_id?: string;
  assigned_to?: string;
  expected_close_date?: string;
  probability?: number;
  notes?: string;
}

export interface MoveDealStageDto {
  funnel_stage: DealStage;
}

export interface DealPipeline {
  [key: string]: Deal[];
}
