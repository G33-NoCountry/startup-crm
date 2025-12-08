import { z } from "zod"

// Definición de colores permitidos (usando 'as const' para tipado estricto)
export const TAG_COLORS = ["red", "blue", "sky", "green", "lime","yellow", "purple", "pink", "indigo", "gray", "emerald", "cyan", "orange"] as const;

// Esquema que solo incluye los campos que el usuario edita o crea.
export const tagFormSchema = z.object({
    id: z.string().or(z.number()).optional(), 
    title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
    color: z.preprocess((val) => {
        if (typeof val !== 'string') return "gray";
        const foundColor = TAG_COLORS.find((c) => val.toLowerCase().includes(c));
        return foundColor || "gray";
    }, z.enum(TAG_COLORS)),
});

export type TagFormData = z.infer<typeof tagFormSchema>;

// Esquema que representa un Tag tal como viene de la base de datos (DBML)
export const tagDbSchema = z.object({
  id: z.string().or(z.number()),
  title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  color: z.preprocess((val) => {
    if (typeof val !== 'string') return "gray";
    const foundColor = TAG_COLORS.find((c) => val.toLowerCase().includes(c));
    return foundColor || "gray";
  }, z.enum(TAG_COLORS)),
  created_at: z.string().or(z.date()).optional(),
  updated_at: z.string().or(z.date()).optional(),
});

export type Tag = z.infer<typeof tagDbSchema>;