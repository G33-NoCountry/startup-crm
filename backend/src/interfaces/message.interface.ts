import { Message } from "../models";
import { IPaginatableRepository } from "./paginate.interface";

export interface IMessageRepository extends IPaginatableRepository<Message> {

}