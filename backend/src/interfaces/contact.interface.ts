import { Contact, Conversation } from "../models";
import { IPaginate } from "./paginate.interface";

export interface IContactRepository {
    findById(id: number): Promise<Contact | null>;
    findAll(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<Contact> | null>;
    createContact(data: any): Promise<Contact | null>;
    updateContact(data: any): Promise<Contact | null>;
    deleteContact(contact: Contact): Promise<void>;
    findConversationsByContactId(contactId: number): Promise<Conversation[] | null>;
}