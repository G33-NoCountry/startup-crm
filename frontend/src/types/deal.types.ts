export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";
export type DealPriority = "low" | "medium" | "high";

export interface Deal {
  id: string;
  title: string;
  description?: string;
  value: number;
  currency: string;
  stage: DealStage;
  priority: DealPriority;
  contact_id: string;
  assigned_to?: string;
  expected_close_date?: string;
  probability?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  contact?: {
    id: string;
    full_name: string;
    email: string;
    company?: string;
  };
  assigned_user?: {
    id: string;
    full_name: string;
    email: string;
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
