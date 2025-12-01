import { query } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

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
        .isString().withMessage(buildValidationMessage("after", "string"))
        .bail()
        .isLength({ min: 1 }).withMessage(buildValidationMessage("after", "min_length", { min: 1 }))
    ,
    query("before")
        .optional()
        .isString().withMessage(buildValidationMessage("before", "string"))
        .bail()
        .isLength({ min: 1 }).withMessage(buildValidationMessage("before", "min_length", { min: 1 }))
    ,
];