import { User } from "../../models";

export class UserResource {
    static toResponse(user: User) {
        return {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            status: user.status,
            avatar_color: user.avatar_color,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
}
