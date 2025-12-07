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
  body("channel")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("channel", "required"))
    .bail()
    .isIn(['whatsapp', 'email']).withMessage(buildValidationMessage("channel", "invalid"))
  ,
  body("content")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("content", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("title", "string"))
    .bail()
    .isLength({ min: 1 }).withMessage(buildValidationMessage("title", "min_length", { min: 1 }))
  ,
  body("status")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("status", "required"))
    .bail()
    .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
  ,
];
