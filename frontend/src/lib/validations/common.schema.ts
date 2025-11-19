import { z } from "zod"

export const emailSchema = z
    .string()
    .min(1, "El email es requerido")
    .email("Email inválido")
    .toLowerCase()
    .trim()

export const passwordSchema = z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")

export const passwordLoginSchema = z
    .string()
    .min(1, "La contraseña es requerida")

export const nameSchema = z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .trim()

export const companyNameSchema = z
    .string()
    .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .trim()
    .optional()