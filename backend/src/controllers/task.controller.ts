import { Request, Response } from "express";
import { Op } from "sequelize";
import { TaskService } from "../services/task.service";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para gestionar tareas (solo acceden usuarios "Admin" y "Agente")
 */
export class TaskController {
  constructor(
    private taskService: TaskService
  ) { }

  public getTasks = async (request: Request, response: Response) => {
    try {
      const { limit, before, after, status } = request.query;
      const user = request.user as User;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

      const tasks = await this.taskService.getTasks(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
        undefined, { user_id: user.id, status: status === "true" }
      );

      return response.status(200).json({
        success: true,
        message: "Tareas obtenidas!",
        data: tasks
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}