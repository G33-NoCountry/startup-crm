import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { UserResource } from "../resources/user/user-resource.resource";
import { createToken } from "../utils/token-generator";
import { jwtConfig } from "../config/jwt.config";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

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