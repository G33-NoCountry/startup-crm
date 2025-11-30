import { IPaginate } from "../interfaces/paginate.interface";
import { ITaskRepository } from "../interfaces/task.interface";
import { Task } from "../models";
import { toPaginate } from "../utils/paginate";

export class TaskRepository implements ITaskRepository {
    async findById(id: number) {
        return Task.findByPk(id);
    }

    async findAll(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<Task> | null> {
        const result = await Task.paginate({
            limit,
            after,
            before,
            include: include,
            attributes: Task.publicAttributes,
            where,
        });

        if (!(result.edges.length > 0))
            return null;

        const paginate = toPaginate<Task>(result);
        return paginate;
    }

    async create(data: any): Promise<Task | null> {
        return Task.create(data);
    }

    async update(data: any): Promise<Task | null> {
        const result = await Task.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const contactUpdated = await this.findById(data.id);
        return contactUpdated;
    }

    async delete(task: Task): Promise<void> {
        return task.destroy();
    }
}