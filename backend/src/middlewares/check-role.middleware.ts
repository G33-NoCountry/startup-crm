import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export function acceptRoleMiddleware(role: 'Admin' | 'Agente' | 'Manager') {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;
        if (!user.checkRole(role)) {
            return res.status(403).json({
                success: false,
                message: "No tiene permiso para acceder",
            });
        }
        next();
    };
}