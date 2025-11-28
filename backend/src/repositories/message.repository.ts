import { IMessageRepository } from "../interfaces/message.interface";
import { IPaginate } from "../interfaces/paginate.interface";
import { Message } from "../models";
import { toPaginate } from "../utils/paginate";

export class MessageRepository implements IMessageRepository {
    async findById(id: number) {
        return Message.findByPk(id);
    }

    async findAll(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<Message> | null> {
        const result = await Message.paginate({
            limit,
            after,
            before,
            include: include,
            attributes: Message.publicAttributes,
            where,
        });

        if (!(result.edges.length > 0))
            return null;

        const paginate = toPaginate<Message>(result);
        return paginate;
    }

    async create(data: any): Promise<Message | null> {
        return Message.create(data);
    }

    async update(data: any): Promise<Message | null> {
        const result = await Message.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const messageUpdated = await this.findById(data.id);
        return messageUpdated;
    }

    async delete(message: Message): Promise<void> {
        return message.destroy();
    }
}
