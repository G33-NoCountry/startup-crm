import { Conversation } from "../models";
import { ICrudBase } from "./crud-base.interface";

export interface IConversationRepository extends ICrudBase<Conversation> { 

}