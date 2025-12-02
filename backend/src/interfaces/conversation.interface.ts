import { Conversation } from "../models";
import { ICrudBase } from "./crud-base.interface";
import { IPaginatableRepository } from "./paginate.interface";

export interface IConversationRepository extends IPaginatableRepository<Conversation> { 

}