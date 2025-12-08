import { z } from "zod"
import { emailSchema, nameSchema, phoneSchema } from "./common.schema"
import { tagDbSchema } from "./tag.schema"

// Schema para el formulario (crear y editar)
export const contactFormSchema = z.object({
  id: z.string().or(z.number()).optional(),
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  tags: z.array(z.number()).optional().default([]),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Schema completo que viene de la base de datos o API
export const contactDbSchema = z.object({
  id: z.string().or(z.number()),
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  tags: z.array(tagDbSchema).default([]),
  created_at: z.string().or(z.date()).optional(),
  updated_at: z.string().or(z.date()).optional(),
})

export type Contact = z.infer<typeof contactDbSchema>