import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const TAG_COLORS = ["gray", "red", "orange", "yellow", "green", "blue", "indigo", "purple"] as const;
export const tagSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.preprocess((val) => {
    if (typeof val !== 'string') return "gray";
    const foundColor = TAG_COLORS.find((c) => val.includes(c));
    return foundColor || "gray";
  }, z.enum(TAG_COLORS)),
  created_at: z.string().or(z.date()).optional(),
});

export type Tag = z.infer<typeof tagSchema>;