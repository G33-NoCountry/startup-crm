import { NextFunction, Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";

export function recordExists<T extends Model>(model: ModelStatic<T>, paramName: string = "id") {
    return (async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params[paramName]);
        if (!await model.findByPk(id)) {
            return res.status(404).json({
                success: false,
                message: "No se encontró",
            });
        }
        next();
    });
}