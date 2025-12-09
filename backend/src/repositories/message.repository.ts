import { PaginationConnection } from "sequelize-cursor-pagination";
import { IMessageRepository } from "../interfaces/message.interface";
import { Contact, Message, User } from "../models";
import { IPaginate } from "../interfaces/paginate.interface";
import { toPaginate } from "../utils/paginate";

export class MessageRepository implements IMessageRepository {
    async findById(id: number) {
        return Message.findByPk(id);
    }

    async resolveSender(result: PaginationConnection<Message>) {
        const messages = result.edges.map(e => e.node.dataValues);

        const userIds = [];
        const contactIds = [];

        for (const msg of messages) {
            if (msg.sender_type == "User")
                userIds.push(msg.sender_id);
            else if (msg.sender_type == "Contact")
                contactIds.push(msg.sender_id);
        }

        const users = userIds.length
            ? await User.findAll({
                where: { id: userIds },
                attributes: ["id", "full_name", "email"],
            }) : [];

        const contacts = contactIds.length
            ? await Contact.findAll({
                where: { id: contactIds },
                attributes: ["id", "full_name", "email", "phone"],
            }) : [];

        const userMap = Object.fromEntries(users.map(u => [u.id, u]));
        const contactMap = Object.fromEntries(contacts.map(c => [c.id, c]));

        return messages.map(msg => {
            let plain: any = {};
            plain = msg;
            if (msg.sender_type === "User") {
                plain.sender = userMap[msg.sender_id] || null;
            } else if (msg.sender_type === "Contact") {
                plain.sender = contactMap[msg.sender_id] || null;
            } else {
                plain.sender = null;
            }

            return plain;
        });;
    }


    async findAll(
        include?: any,
        where?: any
    ): Promise<any> {
        const result = await Message.findAll({
            attributes: Message.publicAttributes,
            where: where,
            order: [["created_at", "DESC"]],
        });

        return result;
    }

    async findAllPaginate(
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
            order: [['created_at', 'DESC']],
        });

        if (!(result.edges.length > 0))
            return null;

        const paginate = toPaginate<Message>(result);
        return paginate;
    }

    // async create(data: any): Promise<Message | null> {
    //     return Message.create(data);
    // }

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

    // Guardar un nuevo mensaje en la BD
    async create(data: { conversation_id: number, user_id: number, content: string, channel: string }) {
    return await Message.create(data as any);
}

    // (Opcional) Listar mensajes de una conversación
    async findByConversation(conversationId: number) {
    return await Message.findAll({
        where: { conversation_id: conversationId },
        order: [['created_at', 'ASC']]
    });
    }

}
