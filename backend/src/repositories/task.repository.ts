import { IPaginate } from "../interfaces/paginate.interface";
import { ITaskRepository } from "../interfaces/task.interface";
import { Task } from "../models";
import { toPaginate } from "../utils/paginate";

export class TaskRepository implements ITaskRepository {
    async findById(id: number) {
        return Task.findByPk(id);
    }

    async findAllPaginate(
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

        const paginate = toPaginate<Task>(result);
        return paginate;
    }
    async findAll(
        include?: any,
        where?: any
    ): Promise<Task[] | null> {
        const result = await Task.findAll({
            include: include,
            attributes: Task.publicAttributes,
            where,
        });

        return result;
    }

    async create(data: any): Promise<Task | null> {
        return Task.create(data);
    }

    async update(data: any): Promise<Task | null> {
        const task = await Task.findByPk(data.id);
        if (!task)
            return null;

        task.set(data);
        return await task.save();
    }

    async delete(task: Task): Promise<void> {
        return task.destroy();
    }
}