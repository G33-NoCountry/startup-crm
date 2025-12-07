import { Op, QueryTypes, Sequelize } from "sequelize";
import { IMetricRepository } from "../interfaces/metric.interface";
import { Contact, Conversation, Deal, FunnelStage, Message, sequelize, Task } from "../models";

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

    public async getCountFunnelById(funnelId: number): Promise<number> {
        const dealsByFunnelId = await Deal.count(
            {
                distinct: true,
                where: { funnel_stage_id: funnelId }
            }
        );

        return dealsByFunnelId;
    }

    public async getTasksByStatus(status: boolean, userId: number): Promise<Task[]> {
        const pendingTasks = await Task.findAll(
            {
                attributes: ["id", "title", "due_date"],
                include: [{
                    model: Contact,
                    as: "contact",
                    required: true,
                    attributes: ["id", "full_name"]
                }],
                where: { user_id: userId, status: status },
            },
        );
        return pendingTasks;
    }

    public async generateRecentActivity(userId: number): Promise<any> {
        const recentConversationWhatsapp = await this.getRecentWhatsapp(userId);
        const recentConversationEmail = await this.getRecentEmails(userId);
        return {
            whatsapp: recentConversationWhatsapp,
            email: recentConversationEmail
        };
    }

    private async getRecentWhatsapp(userId: number): Promise<any> {
        const lastMessageConversation = await Message.findAll({
            attributes: ["conversation_id"],
            where: { sender_type: "User", sender_id: userId },
            order: [["created_at", "DESC"]],
        });

        const lastConversations: Conversation[] = await this.filterLastConversations(lastMessageConversation, "whatsapp");

        return lastConversations;
    }

    private async filterLastConversations(lastMessageConversation: Message[], channel: 'whatsapp' | 'email') {
        let lastConversationsIds: number[] = [];

        for (const message of lastMessageConversation) {
            if (lastConversationsIds.includes(message.conversation_id))
                continue;
            lastConversationsIds.push(message.conversation_id);
        }

        const lastConversations = await Conversation.findAndCountAll({
            attributes: ["id", "last_interaction"],
            where: { id: lastConversationsIds, channel: channel },
            include: [
                {
                    model: Message,
                    as: "messages",
                    required: true,
                    attributes: ["id", "content", "created_at"],
                },
                {
                    model: Contact,
                    as: "contact",
                    required: true,
                    attributes: ["id", "full_name"],
                }
            ],
            distinct: true,
            order: [["last_interaction", "DESC"]],
        });

        for (const conversation of lastConversations.rows) {
            const messages = (conversation as any).messages;
            const lastMessage = messages[messages.length - 1];
            conversation.set("messages", lastMessage);
        }
        return lastConversations.rows.slice(0, 4);
    }

    private async getRecentEmails(userId: number): Promise<any> {
        const lastMessageConversation = await Message.findAll({
            attributes: ["conversation_id"],
            where: { sender_type: "User", sender_id: userId },
            order: [["created_at", "DESC"]],
        });

        const lastConversations: Conversation[] = await this.filterLastConversations(lastMessageConversation, "email");

        return lastConversations;
    }


}
