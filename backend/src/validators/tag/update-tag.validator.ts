import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
  body("title")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("title", "required"))
    .bail()
    .isString().withMessage("title debe ser un string")
    .bail()
    .isLength({ min: 1 }).withMessage(buildValidationMessage("title", "min_length", { min: 1 }))
  ,
  body("color")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("color", "required"))
    .bail()
    .isString().withMessage("color debe ser un string")
  ,
];
