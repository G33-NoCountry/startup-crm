import { Tag } from "../../models";

export class TagResource {
    static toResponse(tag: Tag) {
        return {
            id: tag.id,
            title: tag.title,
            color: tag.color,
            created_at: tag.created_at,
            updated_at: tag.updated_at,
        };
    }
}
