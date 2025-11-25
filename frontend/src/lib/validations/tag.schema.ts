import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tagSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(), // ej: "bg-red-500", "bg-blue-500", etc.
});

export type Tag = z.infer<typeof tagSchema>;