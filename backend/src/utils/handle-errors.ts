import { validationResult } from "express-validator";

export const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Errores de validación",
            data: errors.array(),
        });
    }
    next();
};