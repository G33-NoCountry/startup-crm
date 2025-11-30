import { Contact, Conversation } from "../../models";

export class ConversationResource {
    static toResponse(conversation: Conversation) {
        return {
            id: conversation.id,
            contact_id: conversation.contact_id,
            status: conversation.status,
            channel: conversation.channel,
            last_interaction: conversation.last_interaction,
            created_at: conversation.created_at,
            updated_at: conversation.updated_at,
        };
    }
}
