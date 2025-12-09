import { body } from "express-validator";
import { Deal, User } from "../../models";
import { buildValidationMessage } from "../../utils/validation-messages";

export default [
    body("user_id")
        .exists().withMessage(buildValidationMessage("user_id", "required"))
        .bail()
        .notEmpty().withMessage(buildValidationMessage("user_id", "empty"))
        .bail()
        .isInt().withMessage(buildValidationMessage("user_id", "numeric"))
        .bail()
        .isInt({ min: 1 }).withMessage(buildValidationMessage("user_id", "min_numeric", { min: 1 }))
        .bail()
        .custom(async (id) => {
            if (!await User.findByPk(id))
                throw new Error;
            return true;
        }).withMessage(buildValidationMessage("user_id", "invalid"))
    ,
];