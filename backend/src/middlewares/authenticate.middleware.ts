import { passportConfig } from "../config/passport.config";
import { NextFunction, Request, Response } from "express";

export const passportLocalMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    passportConfig.authenticate("local", (err: any, user: any, info: any) => {
        if (err)
            return next(err);

        if (!user)
            return res.status(401).json({
                success: false,
                message: info?.message || "No está autenticado"
            });
        req.user = user;

        next();
    })(req, res, next);
});

export const checkJwtMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    passportConfig.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
        if (err)
            return next(err);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: info?.message || "No está autenticado"
            });
        }

        req.user = user;
        next();
    })(req, res, next);
});