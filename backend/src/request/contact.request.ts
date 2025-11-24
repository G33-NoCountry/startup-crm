import { Request } from "express";
import { Contact } from "../models";

export interface ContactRequest extends Request {
    contact: Contact;
}
