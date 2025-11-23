import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const isAdmin = ((req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role != "Admin") {
        return res.status(403).json({
            success: false,
            message: "No tiene permiso para acceder",
        });
    }
    next();
});