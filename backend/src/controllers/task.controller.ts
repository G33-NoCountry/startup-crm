import { Request, Response } from "express";
import { Op } from "sequelize";
import { TaskService } from "../services/task.service";
import { User } from "../models";
import { CreateTaskDto } from "../dto/task/create-task.dto";
import { TaskResource } from "../resources/task/task.resource";
import { UpdateTaskDto } from "../dto/task/update-task.dto";

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

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     summary: Obtener tasks
   *     description: Obtener datos de tasks paginados
   *     tags: [Tasks]
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           example: 2
   *         required: true
   *         description: Cantidad de resultados a devolver por página.
   *
   *       - in: query
   *         name: after
   *         schema:
   *           type: string
   *         required: false
   *         description: Cursor para obtener la siguiente página.
   *
   *       - in: query
   *         name: before
   *         schema:
   *           type: string
   *         required: false
   *         description: Cursor para obtener la página anterior.
   * 
   *       - in: query
   *         name: status
   *         schema:
   *           type: boolean
   *           example: true
   *         required: true
   *         description: Estado de la task.
   * 
   *     responses:
   *        200:
   *         description: Tasks obtenidos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Tasks obtenidas!"
   *                 data:
   *                   $ref: '#/components/schemas/PaginateTasks'
   *        400:
   *         description: Solicitud inválida
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/BadRequest'
   *        401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Unauthorized'
   *        403:
   *         description: No tiene permisos
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Forbidden'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
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
        message: "Tasks obtenidas!",
        data: tasks
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Registrar una Task
   *     description: Crea un nuevo registro de Task
   *     tags: [Tasks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTaskRequest'
   *     responses:
   *        201:
   *         description: Task creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Task creada!"
   *                 data:
   *                   $ref: '#/components/schemas/FullTask'
   *        400:
   *         description: Solicitud inválida
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/BadRequest'
   *        401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Unauthorized'
   *        403:
   *         description: No tiene permisos
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Forbidden'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public createTask = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const body = request.body as CreateTaskDto;
      body.user_id = id;
      body.status = false;
      const task = await this.taskService.createTask(body);
      if (!task)
        throw new Error("No se pudo crear el registro");

      return response.status(201).json({
        success: true,
        message: "Task creada!",
        data: TaskResource.toResponse(task)
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * @swagger
   * /api/tasks/{id}:
   *   patch:
   *     summary: Actualizar una Task
   *     description: Actualiza un registro de Task
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la Task
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTaskRequest'
   *     responses:
   *        201:
   *         description: Task creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Task actualizada!"
   *                 data:
   *                   $ref: '#/components/schemas/FullTask'
   *        400:
   *         description: Solicitud inválida
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/BadRequest'
   *        401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Unauthorized'
   *        403:
   *         description: No tiene permisos
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Forbidden'
   *        404:
   *         description: No encontrado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/NotFound'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public updateTask = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const body = request.body as UpdateTaskDto;
      body.id = parseInt(id);
      const taskUpdated = await this.taskService.updateTask(body);
      if (!taskUpdated)
        throw new Error("No se pudo actualizar el registro");

      return response.status(200).json({
        success: true,
        message: "Task actualizada!",
        data: TaskResource.toResponse(taskUpdated)
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * @swagger
   * /api/tasks/{id}:
   *   delete:
   *     summary: Eliminar una Task
   *     description: Elimina un registro de Task
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la Task
   *     responses:
   *        204:
   *         description: Task eliminada exitosamente
   *        400:
   *         description: Solicitud inválida
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/BadRequest'
   *        401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Unauthorized'
   *        403:
   *         description: No tiene permisos
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Forbidden'
   *        404:
   *         description: No encontrado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/NotFound'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public deleteTask = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const parsedId = parseInt(id);
      const task = await this.taskService.getByPk(parsedId);
      if (!task)
        throw new Error("No se encontró");
      await this.taskService.deleteTask(task);

      return response.status(204).send();
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}