import { z } from "zod"
import { emailSchema, nameSchema } from "./common.schema"

export const profileFormSchema = z.object({
  full_name: nameSchema,
  email: emailSchema,
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
