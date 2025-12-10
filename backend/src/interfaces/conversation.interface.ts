import { Conversation } from "../models";
import { IPaginatableRepository } from "./paginate.interface";
import { FindOptions } from "sequelize";

export interface IConversationRepository extends IPaginatableRepository<Conversation> {

    findById(id: number, options?: FindOptions): Promise<Conversation | null>;

    create(data: any): Promise<Conversation | null>;
    update(data: any): Promise<Conversation | null>;
    delete(conversation: Conversation): Promise<void>;
}