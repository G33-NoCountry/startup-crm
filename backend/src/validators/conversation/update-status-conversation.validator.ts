import { body, param } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
  param("id")
    .isNumeric().withMessage(buildValidationMessage("id", "numeric"))
    .bail()
    .isInt({ min: 1 }).withMessage(buildValidationMessage("id", "min_numeric", { min: 1 }))
  ,
  body("status")
    .notEmpty().withMessage(buildValidationMessage("status", "required"))
    .bail()
    .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
  ,
];