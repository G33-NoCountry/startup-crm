import { Template } from "../../models";

export class TemplateResource {
    static toResponse(template: Template) {
        return {
            id: template.id,
            title: template.title,
            channel: template.channel,
            content: template.content,
            status: template.status,
            user_id: template.user_id,
            created_at: template.created_at,
            updated_at: template.updated_at,
        };
    }
}
