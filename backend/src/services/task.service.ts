import { ITaskRepository } from "../interfaces/task.interface";
import { Task } from "../models";

export class TaskService {

  constructor(private taskRepository: ITaskRepository) { }

  public async getByPk(id: number) {
    return this.taskRepository.findById(id);
  }

  public async getTasks(
    include?: any,
    where?: any,
  ) {
    return this.taskRepository.findAll(include,where);
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
