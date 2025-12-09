import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { Contact, Deal } from "../../models";

const validateFutureDate = (date: string) => {
  if (new Date(date) < new Date)
    throw new Error("La fecha no puede ser anterior a la fecha actual");
  return true;
};

const validateDealExist = async (id: number) => {
  if (!await Deal.findByPk(id))
    throw new Error;
  return true;
};

const validateContactExist = async (id: number) => {
  if (!await Contact.findByPk(id))
    throw new Error;
  return true;
};

export default [
  body("deal_id")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("deal_id", "required"))
    .bail()
    .isInt().withMessage(buildValidationMessage("deal_id", "numeric"))
    .bail()
    .isInt({ min: 1 }).withMessage(buildValidationMessage("deal_id", "min_numeric", { min: 1 }))
    .bail()
    .custom(validateDealExist).withMessage(buildValidationMessage("deal_id", "invalid"))
  ,
  body("contact_id")
    .optional()
    .notEmpty().withMessage(buildValidationMessage("contact_id", "required"))
    .bail()
    .isInt().withMessage(buildValidationMessage("contact_id", "numeric"))
    .bail()
    .isInt({ min: 1 }).withMessage(buildValidationMessage("contact_id", "min_numeric", { min: 1 }))
    .bail()
    .custom(validateContactExist).withMessage(buildValidationMessage("contact_id", "invalid"))
  ,
  body("title")
    .notEmpty().withMessage(buildValidationMessage("full_name", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("full_name", "string"))
    .bail()
    .isLength({ min: 3 }).withMessage(buildValidationMessage("full_name", "min_length", { min: 3 }))
  ,
  body("start_date")
    .notEmpty().withMessage(buildValidationMessage("start_date", "required"))
    .bail()
    .isISO8601().withMessage(buildValidationMessage("start_date", "date"))
  ,
  body("due_date")
    .notEmpty().withMessage(buildValidationMessage("due_date", "required"))
    .bail()
    .isISO8601().withMessage(buildValidationMessage("due_date", "date"))
    .bail()
    .custom(validateFutureDate)
  ,
  body("color")
    .notEmpty().withMessage(buildValidationMessage("color", "required"))
    .bail()
    .isString().withMessage(buildValidationMessage("color", "string"))
  ,
];
