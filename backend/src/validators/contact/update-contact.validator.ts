import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { validateEmail, validatePhoneExist } from "../../utils/validators";

const validateEqualValue = (value: string, { req, path }: any) => {
  const contact = req.contact;
  if (!contact)
    throw new Error;

  if (contact[path] != value)
    return true;

  return false;
};

export const updateContactValidator = [
  body("full_name")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("full_name", "required"))
    .bail()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage(buildValidationMessage("full_name", "alpha"))
    .bail()
    .isLength({ min: 3 }).withMessage(buildValidationMessage("full_name", "min_length", { min: 3 }))
  ,
  body("email")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("email", "required"))
    .bail()
    .isEmail().withMessage(buildValidationMessage("email", "invalid_format"))
    .bail()
    .if(validateEqualValue)
    .custom(validateEmail).withMessage(buildValidationMessage("email", "already_exists"))
  ,
  body("phone")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("phone", "required"))
    .bail()
    .trim()
    .matches(/^\+[1-9]\d{1,14}$/).withMessage(buildValidationMessage("phone", "invalid_format"))
    .bail()
    .if(validateEqualValue)
    .custom(validatePhoneExist).withMessage(buildValidationMessage("phone", "already_exists"))
  ,

];
