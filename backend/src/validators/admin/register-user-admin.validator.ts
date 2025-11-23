import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { validateEmail, validatePassword } from "../../utils/validators";

export const registerUserAdminValidator = [
  body("full_name")
    .notEmpty().withMessage(buildValidationMessage("full_name", "required"))
    .bail()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage(buildValidationMessage("full_name", "alpha"))
    .bail()
    .isLength({ min: 3 }).withMessage(buildValidationMessage("full_name", "min_length", { min: 3 }))
  ,
  body("email")
    .notEmpty().withMessage(buildValidationMessage("email", "required"))
    .bail()
    .isEmail().withMessage(buildValidationMessage("email", "invalid_format"))
    .bail()
    .custom(validateEmail).withMessage(buildValidationMessage("email", "already_exists"))
  ,
  body("password")
    .notEmpty().withMessage(buildValidationMessage("password", "required"))
    .bail()
    .isString()
    .isLength({ min: 8 }).withMessage(buildValidationMessage("password", "min_length", { min: 8 }))
    .bail()
    .isLength({ max: 60 }).withMessage(buildValidationMessage("password", "max_length", { max: 60 }))
    .bail()
    .custom(validatePassword).withMessage(buildValidationMessage("password", "weak_password"))
  ,
  body("role")
    .notEmpty().withMessage(buildValidationMessage("role", "required"))
    .bail()
    .isIn([
      'Admin', 'Agente', 'Manager'
    ]).withMessage(buildValidationMessage("role", "invalid"))
  ,

];
