import { z } from "zod"
import { emailSchema, nameSchema, phoneSchema } from "./common.schema"

export const userRoleEnum = z.enum(["Admin", "Manager", "Agente"])
export type UserRole = z.infer<typeof userRoleEnum>

export const userStatusEnum = z.enum(["Activo", "Inactivo"])
export type UserStatus = z.infer<typeof userStatusEnum>

export const userFormSchema = z.object({
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  role: userRoleEnum,
  status: userStatusEnum,
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").or(z.literal("")).optional(),
})

export type UserFormData = z.infer<typeof userFormSchema>

export const userDbSchema = z.object({
  id: z.string().or(z.number()),
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  role: userRoleEnum,
  status: userStatusEnum,
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()).optional(),
})

export type User = z.infer<typeof userDbSchema>
