import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
  body("title")
    .notEmpty().withMessage(buildValidationMessage("title", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("title", "string"))
    .bail()
    .isLength({ min: 1 }).withMessage(buildValidationMessage("title", "min_length", { min: 1 }))
  ,
  body("color")
    .notEmpty().withMessage(buildValidationMessage("color", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("color", "string"))
  ,
];
