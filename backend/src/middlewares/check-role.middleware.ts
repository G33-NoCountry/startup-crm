import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export function acceptRoleMiddleware(...roles: ('Admin' | 'Agente' | 'Manager')[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;

        if (!user) {
            return res.status(401).json({ message: "No autorizado" });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                message: "No tiene permiso para acceder",
            });
        }
        next();
    };
}