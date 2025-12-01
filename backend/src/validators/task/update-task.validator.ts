import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
  body("status")
    .notEmpty().withMessage(buildValidationMessage("status", "required"))
    .bail()
    .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
  ,
];
