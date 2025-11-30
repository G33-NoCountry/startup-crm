import { PaginationConnection } from "sequelize-cursor-pagination";
import { IMessageRepository } from "../interfaces/message.interface";
import { Contact, Message, User } from "../models";

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
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<any> {
        const result = await Message.paginate({
            limit,
            after,
            before,
            attributes: Message.publicAttributes,
            where: where,
            order: [["created_at", "DESC"]],
        });

        const items = await this.resolveSender(result);

        if (!(result.edges.length > 0))
            return null;

        return {
            items: items,
            paginate_info: {
                has_next: result.pageInfo.hasNextPage,
            },
        };
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
