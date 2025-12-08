import { query } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
    query("status")
        .notEmpty().withMessage(buildValidationMessage("status", "required"))
        .bail()
        .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
    ,
    query("date_from")
        .optional()
        .notEmpty().withMessage(buildValidationMessage("from", "required"))
        .bail()
        .isISO8601().withMessage(buildValidationMessage("from", "date"))
    ,
    query("date_to")
        .optional()
        .notEmpty().withMessage(buildValidationMessage("from", "required"))
        .bail()
        .isISO8601().withMessage(buildValidationMessage("from", "date"))
    ,
];