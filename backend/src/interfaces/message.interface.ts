import { Message } from "../models";
import { IPaginatableRepository } from "./paginate.interface"; 


export interface IMessageRepository extends IPaginatableRepository<Message> {

    findById(id: number): Promise<Message | null>;

    create(data: any): Promise<Message | null>;

    update(data: any): Promise<Message | null>;

    delete(message: Message): Promise<void>;
}