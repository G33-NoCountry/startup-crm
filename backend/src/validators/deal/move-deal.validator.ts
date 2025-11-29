import { body, param } from "express-validator";
import { FunnelStage } from "../../models";

export const moveDealValidator = [
    // Validar que el ID del deal venga en la URL y sea numérico
    param("id")
        .exists().withMessage("El ID del deal es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID del deal debe ser un número entero positivo"),

    // Validar que el nuevo stage venga en el body
    body("funnel_stage_id")
        .exists().withMessage("El funnel_stage_id es obligatorio")
        .isInt({ min: 1 }).withMessage("El funnel_stage_id debe ser un número entero")
        // Validar que la etapa realmente exista en la BD
        .custom(async (value) => {
            const stage = await FunnelStage.findByPk(value);
            if (!stage) {
                throw new Error("La etapa del funnel no existe");
            }
            return true;
        }),
];