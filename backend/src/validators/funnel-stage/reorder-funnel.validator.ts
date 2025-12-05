import { body } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { FunnelStage } from "../../models";

const validateFunnelStageExist = async (id: number) => {
  if (!await FunnelStage.findByPk(id))
    throw new Error;
  return true;
};

export default [
  body("funnels")
    .isArray({ min: 1 }).withMessage(buildValidationMessage("funnels", "array"))
    .bail()
    .notEmpty().withMessage(buildValidationMessage("funnels", "required"))
  ,
  body("funnels.*.id")
    .notEmpty().withMessage(buildValidationMessage("id", "required"))
    .bail()
    .isInt({ min: 1 })
    .withMessage(buildValidationMessage("id", "numeric"))
    .bail()
    .custom(validateFunnelStageExist).withMessage("")
  ,
  body("funnels.*.sort_order")
    .notEmpty().withMessage(buildValidationMessage("sort_order", "required"))
    .bail()
    .isInt({ min: 1 })
    .withMessage(buildValidationMessage("sort_order", "numeric"))
  ,
];
