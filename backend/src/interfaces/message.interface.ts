import { Message } from "../models";
import { ICrudBase } from "./crud-base.interface";

export interface IMessageRepository extends ICrudBase<Message> {

}