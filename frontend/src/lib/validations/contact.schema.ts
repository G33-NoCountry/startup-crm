import { z } from "zod"
import { tagSchema } from "./tag.schema"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const contactSchema = z.object({
  id: z.number().or(z.string()),
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  tags: z.array(tagSchema).default([]),
  created_at: z.string().or(z.date())
})

export type Contact = z.infer<typeof contactSchema>