export type UserRole = "Admin" | "Manager" | "Agente";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  status: boolean;
  avatar_color?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  status?: boolean;
  avatar_color?: string;
}

export interface UpdateUserDto {
  full_name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: boolean;
  avatar_color?: string;
}

export interface UpdateProfileDto {
  full_name?: string;
  email?: string;
  avatar_color?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
