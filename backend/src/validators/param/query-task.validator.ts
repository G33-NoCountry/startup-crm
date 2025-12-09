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
        .notEmpty().withMessage(buildValidationMessage("date_from", "required"))
        .bail()
        .isISO8601().withMessage(buildValidationMessage("date_from", "date"))
    ,
    query("date_to")
        .optional()
        .notEmpty().withMessage(buildValidationMessage("date_to", "required"))
        .bail()
        .isISO8601().withMessage(buildValidationMessage("date_to", "date"))
    ,
];