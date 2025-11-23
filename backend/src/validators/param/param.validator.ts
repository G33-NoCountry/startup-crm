import { param } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export function validateParam(paramName: string) {
    return [
        param(paramName)
            .isNumeric().withMessage(buildValidationMessage("id", "numeric"))
            .bail()
            .isInt({ min: 1 }).withMessage(buildValidationMessage("id", "min_numeric", { min: 1 }))
    ];
};