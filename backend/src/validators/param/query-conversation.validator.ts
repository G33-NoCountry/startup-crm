import { query } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

const validateNotFutureDate = (date: string) => {
    if (new Date(date) > new Date) {
        throw new Error("La hora de filtrado no puede ser posterior a la fecha actual");
    }

    return true;
};

export const queryParamConversationValidator = [
    query("limit")
        .notEmpty().withMessage(buildValidationMessage("limit", "required"))
        .bail()
        .isNumeric().withMessage(buildValidationMessage("limit", "numeric"))
        .bail()
        .isInt({ min: 1 }).withMessage(buildValidationMessage("limit", "min_numeric", { min: 1 }))
    ,
    query("before")
        .notEmpty().withMessage(buildValidationMessage("before", "required"))
        .bail()
        .isISO8601().withMessage(buildValidationMessage("before", "date"))
        .bail()
        .custom(validateNotFutureDate)
    ,
];