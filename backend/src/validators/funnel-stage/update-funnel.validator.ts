import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
  body("title")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("title", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("title", "string"))
    .bail()
    .isLength({ min: 1 }).withMessage(buildValidationMessage("title", "min_length", { min: 1 }))
  ,
  body("is_closed")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("is_closed", "required"))
    .bail()
    .isBoolean().withMessage(buildValidationMessage("is_closed", "boolean"))
  ,
];
