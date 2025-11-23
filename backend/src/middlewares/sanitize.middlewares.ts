import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

export const sanitizeBody = (async (req: Request, res: Response, next: NextFunction) => {
    const body = matchedData(req);
    req.body = body;
    next();
});