import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { Op } from "sequelize";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints para gestión de usuarios (solo admins)
 */
export class AdminController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/admin/users:
   *   get:
   *     summary: Obtener usuarios
   *     description: Obtener datos de usuarios paginados (solo para admins)
   *     tags: [Admin]
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *         required: false
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
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Usuarios obtenidos
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
   *                   example: "Usuarios obtenidos!"
   *                 data:
   *                   $ref: '#/components/schemas/Paginate'                    
   * 
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
  public getUserList = async (request: Request, response: Response) => {
    try {
      const userId = request.user as User;
      const { after, limit, before } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      const users = await this.userService.getUsersPaginate(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
        {
          id: {
            [Op.ne]: userId.id
          }
        }
      );

      return response.status(200).json({
        success: true,
        message: "Usuarios obtenidos!",
        data: users
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}