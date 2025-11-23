import { Contact } from "../models";
import { IPaginate } from "./paginate.interface";

export interface IContactRepository {
    findById(id: number): Promise<Contact | null>;
    findAll(limit: number | undefined, after?: string, before?: string, where?: any): Promise<IPaginate<Contact>>;
    // create(data: any): Promise<Contact[]>;
}