import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserResource } from "../resources/user/user-resource.resource";
import { User } from "../models";
import { UpdateUserDto } from "../dto/user/update-user.dto";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestión de usuarios
 */
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/users/me:
   *   get:
   *     summary: Mostrar el usuario logueado
   *     description: Permite obtener el usuario logueado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Se obtiene el usuario logueado
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
   *                   example: "Usuario encontrado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullUser'                    
   * 
   *        401:
   *         description: No autorizado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Unauthorized'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public getUserLogin = async (request: Request, response: Response) => {
    try {
      const user = request.user as User;
      return response.status(200).json({
        success: true,
        message: "Usuario encontrado!",
        data: UserResource.toResponse(user)
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
   * /api/users/me:
   *   patch:
   *     summary: Actualiza datos personales de un usuario
   *     description: Actualiza al usuario logueado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Se actualiza el usuario
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
   *                   example: "Usuario actualizado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullUser'
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
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public updateUser = async (request: Request, response: Response) => {
    try {
      const user = request.user as User;
      const body = request.body as UpdateUserDto;
      body.id = user.id;
      
      const isUpdated = await this.userService.updateUser(body);
      const userUpdated = await this.userService.getByPk(user.id);
      if (!isUpdated || !userUpdated)
        throw new Error("No se pudo actualizar el usuario");

      return response.status(200).json({
        success: true,
        message: "Usuario actualizado!",
        data: UserResource.toResponse(userUpdated)
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}