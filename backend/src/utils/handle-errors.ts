import { validationResult } from "express-validator";
import { passportConfig } from "../config/passport.config";
import { NextFunction, Request, Response } from "express";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Errores de validación",
            data: errors.array(),
        });
    }
    next();
};

export const handlePassportLocalError = ((req: Request, res: Response, next: NextFunction) => {
    passportConfig.authenticate("local", (err: any, user: any, info: any) => {
        if (err) return next(err);

        if (!user)
            return res.status(401).json({
                success: false,
                message: "No está autenticado"
            });
        req.user = user;
        
        next();
    })(req, res, next);
});

export const handlePassportJWTError = ((req: Request, res: Response, next: NextFunction) => {
    passportConfig.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
        if (err)
            return next(err);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: info?.message || "Unauthorized"
            });
        }

        req.user = user;
        next();
    })(req, res, next);
});