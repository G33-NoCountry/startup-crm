import { query } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
    query("status")
        .notEmpty().withMessage(buildValidationMessage("status", "required"))
        .bail()
        .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
    ,
];