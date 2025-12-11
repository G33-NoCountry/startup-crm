import { z } from "zod"
import {
    emailSchema,
    passwordSchema,
    passwordLoginSchema,
    nameSchema,
    companyNameSchema,
} from "./common.schema"

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordLoginSchema,
    rememberMe: z.boolean().default(false),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z
    .object({
        fullName: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirma tu contraseña"),
        companyName: companyNameSchema.optional(),
        acceptTerms: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

export type RegisterFormData = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
    email: emailSchema,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirma tu contraseña"),
        token: z.string().min(1, "Token inválido"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const changePasswordSchema = z
    .object({
        currentPassword: passwordLoginSchema,
        newPassword: passwordSchema,
        confirmNewPassword: z.string().min(1, "Confirma tu nueva contraseña"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "La nueva contraseña debe ser diferente a la actual",
        path: ["newPassword"],
    })

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>