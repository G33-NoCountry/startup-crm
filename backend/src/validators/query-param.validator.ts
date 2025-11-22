import { query } from "express-validator";
import { buildValidationMessage } from "../utils/validation-messages";

export const queryParamPaginateValidator = [
    query("limit")
        .notEmpty().withMessage(buildValidationMessage("limit", "required"))
        .bail()
        .isNumeric().withMessage(buildValidationMessage("limit", "numeric"))
        .bail()
        .isInt({ min: 1 }).withMessage(buildValidationMessage("limit", "min_numeric", { min: 1 }))
    ,
    query("after")
        .optional()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage(buildValidationMessage("after", "alpha"))
        .bail()
        .isLength({ min: 4, max: 4 }).withMessage(buildValidationMessage("after", "max_length", { max: 4 }))
    ,
    query("before")
        .optional()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage(buildValidationMessage("before", "alpha"))
        .bail()
        .isLength({ min: 4, max: 4 }).withMessage(buildValidationMessage("before", "max_length", { max: 4 }))
    ,
];