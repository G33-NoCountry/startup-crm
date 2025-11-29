import { query } from "express-validator";
import { buildValidationMessage } from "../../utils/validation-messages";
import { NextFunction, Request, Response } from "express";
import { FunnelStage } from "../../models";

export const queryParamFunnelStageIdValidator = [
    query("funnel_stage_id")
        .optional()
        .notEmpty().withMessage(buildValidationMessage("funnel_stage_id", "required"))
        .bail()
        .isNumeric().withMessage(buildValidationMessage("funnel_stage_id", "numeric"))
        .bail()
        .isInt({ min: 1 }).withMessage(buildValidationMessage("funnel_stage_id", "min_numeric", { min: 1 }))
    ,
];

export const queryFunnelStageExists = (async (req: Request, res: Response, next: NextFunction) => {
    const { funnel_stage_id } = req.query;
    if (!funnel_stage_id)
        next();

    const funnelStageId = parseInt(funnel_stage_id as string);

    if (!await FunnelStage.findByPk(funnelStageId)) {
        return res.status(404).json({
            success: false,
            message: "No se encontró",
        });
    }
    next();
});