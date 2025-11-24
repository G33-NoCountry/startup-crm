import { NextFunction, Request, Response } from "express";
import { Contact } from "../models";

export const contactExists = (async (req: Request, res: Response, next: NextFunction) => {
    const contactId = parseInt(req.params.id);
    if (!await Contact.findByPk(contactId)) {
        return res.status(404).json({
            success: false,
            message: "No se encontró",
        });
    }
    next();
});