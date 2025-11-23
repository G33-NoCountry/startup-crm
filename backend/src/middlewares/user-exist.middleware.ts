import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const userExists = (async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);
    if (!await User.findByPk(userId)) {
        return res.status(404).json({
            success: false,
            message: "No se encontró",
        });
    }
    next();
});