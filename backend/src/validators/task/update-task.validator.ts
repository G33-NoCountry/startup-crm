import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";

const validateFutureDate = (date: string) => {
  if (new Date(date) < new Date)
    throw new Error("La fecha no puede ser anterior a la fecha actual");
  return true;
};

export default [
  body("title")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("full_name", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("full_name", "string"))
    .bail()
    .isLength({ min: 3 }).withMessage(buildValidationMessage("full_name", "min_length", { min: 3 }))
  ,
  body("start_date")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("start_date", "required"))
    .bail()
    .isISO8601().withMessage(buildValidationMessage("start_date", "date"))
  ,
  body("due_date")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("due_date", "required"))
    .bail()
    .isISO8601().withMessage(buildValidationMessage("due_date", "date"))
    .bail()
    .custom(validateFutureDate)
  ,
  body("status")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("status", "required"))
    .bail()
    .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
  ,
  body("color")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("color", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("color", "string"))
  ,
];
