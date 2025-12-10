import { Task } from "../../models";

export class TaskResource {
    static toResponse(task: Task) {
        return {
            id: task.id,
            title: task.title,
            user_id: task.user_id,
            contact_id: task.contact_id ?? null,
            deal_id: task.deal_id ?? null,
            status: task.status,
            start_date: task.start_date,
            due_date: task.due_date,
            color: task.color,
            created_at: task.created_at,
            updated_at: task.updated_at,
        };
    }
}
