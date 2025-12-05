import { Conversation } from "../models";
import { IPaginatableRepository } from "./paginate.interface";

export interface IConversationRepository extends IPaginatableRepository<Conversation> { 

}