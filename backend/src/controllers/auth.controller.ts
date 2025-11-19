import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterUserDto } from "../dto/auth/register-user.dto";

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

      return response.status(201).json({
        success: true,
        message: "Registro exitoso!",
        data: user,
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}