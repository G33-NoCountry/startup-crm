import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { validateEmail } from "../../utils/validators";
import { User } from "../../models";

const validateEqualEmail = async (value: string, { req }: any) => {
  const userId = parseInt(req.params.id);
  const user = await User.findByPk(userId) as any;

  if (user.email == value)
    return true;

  return await validateEmail(value);
};

export const updateUserAdminValidator = [
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
    .custom(validateEqualEmail).withMessage(buildValidationMessage("email", "already_exists"))
  ,
  body("role")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("role", "required"))
    .bail()
    .isIn([
      'Admin', 'Agente', 'Manager'
    ]).withMessage(buildValidationMessage("role", "invalid"))
  ,
  body("status")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("status", "required"))
    .bail()
    .isBoolean().withMessage(buildValidationMessage("status", "boolean"))
  ,

];