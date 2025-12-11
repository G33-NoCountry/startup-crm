import { z } from 'zod'

// Esquema base para los datos del formulario (start/end como strings)
export const calendarEventFormSchema = z
  .object({
    title: z.string().min(1, 'Titulo es requerido'),
    // Usamos .min(1) y esperamos un string en formato ISO o compatible
    start: z.string().min(1, 'Fecha de inicio es requerida'),
    end: z.string().min(1, 'Fecha de finalización es requerida'),
    color: z.string(),
  })
  .refine(
    (data) => {
      // Validación de que la fecha final sea mayor o igual a la inicial
      try {
        const start = new Date(data.start)
        const end = new Date(data.end)
        return end >= start
      } catch {
        return false // Fallback de seguridad
      }
    },
    {
      message: 'La fecha final debe ser mayor o igual a la fecha inicial',
      path: ['end'],
    }
  )

export type CalendarEventFormValues = z.infer<typeof calendarEventFormSchema>