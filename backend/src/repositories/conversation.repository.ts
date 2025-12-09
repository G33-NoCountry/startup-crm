import { IConversationRepository } from "../interfaces/conversation.interface";
import { IPaginate } from "../interfaces/paginate.interface";
import { Conversation } from "../models";
import { toPaginate } from "../utils/paginate";
import { FindOptions } from "sequelize";

export class ConversationRepository implements IConversationRepository {
    async findById(id: number, options?: FindOptions) {
        return Conversation.findByPk(id, options);
    }

    async findAll(
        include?: any,
        where?: any
    ): Promise<Conversation[] | null> {
        const result = await Conversation.findAll({
            include: include,
            attributes: Conversation.publicAttributes,
            where,
        });

        return result;
    }

    async findAllPaginate(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<Conversation> | null> {
        const result = await Conversation.paginate({
            limit,
            after,
            before,
            include: include,
            attributes: Conversation.publicAttributes,
            where,
        });

        if (!(result.edges.length > 0))
            return null;

        const paginate = toPaginate<Conversation>(result);
        return paginate;
    }
    async create(data: any): Promise<Conversation | null> {
        return Conversation.create(data);
    }

    async update(data: any): Promise<Conversation | null> {
        const result = await Conversation.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const conversationUpdated = await this.findById(data.id);
        return conversationUpdated;
    }

    async delete(Conversation: Conversation): Promise<void> {
        return Conversation.destroy();
    }
}
