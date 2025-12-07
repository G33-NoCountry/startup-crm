export type ContactStatus = "lead" | "client" | "lost" | "inactive";
export type ContactSource = "website" | "referral" | "social_media" | "direct" | "other";

export interface Contact {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status: ContactStatus;
  source?: ContactSource;
  notes?: string;
  avatar_color?: string;
  tags?: string[];
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContactDto {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  status?: ContactStatus;
  source?: ContactSource;
  notes?: string;
  avatar_color?: string;
  assigned_to?: string;
}

export interface UpdateContactDto {
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  status?: ContactStatus;
  source?: ContactSource;
  notes?: string;
  avatar_color?: string;
  assigned_to?: string;
}

export interface ContactConversation {
  id: string;
  contact_id: string;
  subject: string;
  status: "open" | "closed" | "pending";
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}
