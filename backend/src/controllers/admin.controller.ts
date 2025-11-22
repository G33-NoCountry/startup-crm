import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { Op } from "sequelize";
import { User } from "../models";

export class AdminController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

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