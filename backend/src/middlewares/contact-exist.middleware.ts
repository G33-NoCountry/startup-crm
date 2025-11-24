import { NextFunction, Request, Response } from "express";
import { Contact } from "../models";
import { ContactRequest } from "../request/contact.request";

export const contactExists = (async (req: Request, res: Response, next: NextFunction) => {
    const contactId = parseInt(req.params.id);
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
        return res.status(404).json({
            success: false,
            message: "No se encontró",
        });
    }
    (req as ContactRequest).contact = contact;
    next();
});