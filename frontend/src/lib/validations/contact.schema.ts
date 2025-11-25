import { z } from "zod"
import { emailSchema, nameSchema, phoneSchema } from "./common.schema"
import { tagSchema } from "./tag.schema"

// Schema para el formulario (crear y editar)
export const contactFormSchema = z.object({
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  tags: z.array(z.string()).optional().default([]),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Schema completo que viene de la base de datos o API
export const contactDbSchema = z.object({
  id: z.string().or(z.number()),
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  tags: z.array(tagSchema).default([]),
  created_at: z.string().or(z.date()),
})

export type Contact = z.infer<typeof contactDbSchema>