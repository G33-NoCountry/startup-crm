import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export const loginValidator = [
  body("email")
    .notEmpty().withMessage(buildValidationMessage("email", "required"))
    .bail()
    .isEmail().withMessage(buildValidationMessage("email", "invalid_format"))
  ,
  body("password")
    .notEmpty().withMessage(buildValidationMessage("password", "required"))
    .bail()
    .isString()
    .isLength({ min: 8 }).withMessage(buildValidationMessage("password", "min_length", { min: 8 }))
    .bail()
    .isLength({ max: 60 }).withMessage(buildValidationMessage("password", "max_length", { max: 60 }))
  ,
];
