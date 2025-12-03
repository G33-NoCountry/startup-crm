import { Op } from "sequelize";
import { IMetricRepository } from "../interfaces/metric.interface";
import { Contact, Conversation, Deal, Message } from "../models";

export class MetricRepository implements IMetricRepository {

    public async getCountActiveContacts(): Promise<number> {
        const contactConversations = await Contact.findAndCountAll({
            attributes: [],
            distinct: true,
            include: [
                {
                    model: Conversation,
                    as: "conversations",
                    required: true,
                    attributes: [],
                    where: { status: true }
                }
            ]
        });

        return contactConversations.count;
    }

    public async getTotalSentMessages(): Promise<number> {
        const messagesCount = await Message.count({
            distinct: true
        });

        return messagesCount;
    }

    public async getCountSentMessagesByUser(user_id: number): Promise<number> {
        const messages = await Message.findAndCountAll({
            distinct: true,
            where: {
                sender_type: "User",
                sender_id: user_id
            }
        });

        return messages.count;
    }

    public async calculateResponseRate() {
        const userMessagesCount = await Message.count({
            where: { sender_type: "User" }
        });

        const contactMessagesCount = await Message.count({
            where: { sender_type: "Contact" }
        });

        return userMessagesCount != 0 ? (contactMessagesCount / userMessagesCount) * 100 : 0;
    }

    public async calculateDealValues() {
        const deals = await Deal.findAll(
            {
                attributes: ["value"],
                where: {
                    funnel_stage_id: { [Op.ne]: [5, 6] },
                },
            }
        )
        let dealsValue = 0;
        deals.forEach(deal => {
            dealsValue += deal.value ?? 0;
        });

        return dealsValue;
    }

}
