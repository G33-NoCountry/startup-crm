import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { validateEmail } from "../../utils/validators";

const validatePassword = async (password: string) => {
  if (! /[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)) {
    throw new Error;
  }
};

const validatePasswordConfirmation = async (passwordConfirmation: string, { req }: any) => {
  if (passwordConfirmation != req.body.password)
    throw new Error("Las contraseñas no coinciden.");
};

export const registerUserValidator = [
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
  body("password_confirmation")
    .notEmpty().withMessage(buildValidationMessage("password_confirmation", "required"))
    .bail()
    .isString()
    .isLength({ min: 8 }).withMessage(buildValidationMessage("password_confirmation", "min_length", { min: 8 }))
    .bail()
    .isLength({ max: 60 }).withMessage(buildValidationMessage("password_confirmation", "max_length", { max: 60 }))
    .bail()
    .custom(validatePasswordConfirmation)
  ,

];
