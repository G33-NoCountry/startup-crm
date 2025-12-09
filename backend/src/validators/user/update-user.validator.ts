import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { validateEmail } from "../../utils/validators";

const validateEqualValue = (value: string, { req, path }: any) => {
  const user = req.user;
  if (!user)
    return false;

  if (user[path] != value)
    return true;
};

export const updateUserValidator = [
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
  body("avatar_color")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("avatar_color", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("avatar_color", "string"))
  ,

];