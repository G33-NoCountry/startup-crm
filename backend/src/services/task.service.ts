import { ITaskRepository } from "../interfaces/task.interface";
import { Task } from "../models";

export class TaskService {

  constructor(private taskRepository: ITaskRepository) { }

  public async getByPk(id: number) {
    return this.taskRepository.findById(id);
  }

  public async getTasks(
    limit: number | undefined,
    after?: string,
    before?: string,
    include?: any,
    where?: any
  ) {
    return this.taskRepository.findAllPaginate(limit, after, before, include, where);
  }

  public async createTask(data: any): Promise<Task | null> {
    return this.taskRepository.create(data);
  }

  public async updateTask(data: any): Promise<Task | null> {
    return this.taskRepository.update(data);
  }

  public async deleteTask(task: Task): Promise<void> {
    return this.taskRepository.delete(task);
  }

}
