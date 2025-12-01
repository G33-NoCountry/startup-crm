import { Contact, Conversation } from "../models";
import { IPaginatableRepository } from "./paginate.interface";

export interface IContactRepository extends IPaginatableRepository<Contact>{
    findConversationsByContactId(contactId: number): Promise<Conversation[] | null>;
}