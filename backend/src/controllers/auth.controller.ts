import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { UserResource } from "../resources/user/user-resource.resource";
import { createToken } from "../utils/token-generator";
import { jwtConfig } from "../config/jwt.config";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para autenticación y gestión de usuarios
 */
export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     description: Crea una nueva cuenta de usuario
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterRequest'
   *     responses:
   *        201:
   *         description: Usuario registrado exitosamente
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
   *                   example: "Registro exitoso!"
   *                 data:
   *                   type: object
   *                   properties:
   *                     user: 
   *                       $ref: '#/components/schemas/FullUser'
   *                     access_token: 
   *                       type: string
   *                       example: eyJhbGciOiJ ...
   *                     refresh_token: 
   *                       type: string
   *                       example: eyJhbGciOiJ ...
   * 
   *        400:
   *         description: Solicitud inválida
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/BadRequest'
   *        409:
   *         description: Existe una sesión iniciada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Authenticated'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public registerUser = async (request: Request, response: Response) => {
    try {
      const body = request.body as RegisterUserDto;
      const user = await this.userService.registerUser(body);

      if (!user)
        throw new Error("No se registro el usuario");

      const jwt = createToken({
        id: user.id, role: user.role, email: user.email
      }, jwtConfig.access_secret, jwtConfig.access_expire);

      const refreshToken = createToken({
        id: user.id, role: user.role, email: user.email
      }, jwtConfig.refresh_secret, jwtConfig.refresh_expire);

      return response.status(201).json({
        success: true,
        message: "Registro exitoso!",
        data: {
          user: UserResource.toResponse(user),
          access_token: jwt,
          refres_token: refreshToken,
        }
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}