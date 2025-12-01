import { Request, Response } from "express";
import { TagService } from "../services/tag.service";

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Endpoints para gestionar tags (solo acceden usuarios "Admin")
 */
export class TagController {
  constructor(
    private tagService: TagService,
  ) { }

  
  /**
   * @swagger
   * /api/admin/tags:
   *   get:
   *     summary: Obtener tags
   *     description: Obtener datos de tags
   *     tags: [Tags]
   *     responses:
   *        200:
   *         description: Tags obtenidas
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
   *                   example: "Tags obtenidas!"
   *                 data:
   *                   $ref: '#/components/schemas/TagList'                    
   * 
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
  public getTags = async (request: Request, response: Response) => {
    try {

      const tags = await this.tagService.getTags();

      return response.status(200).json({
        success: true,
        message: "Tags obtenidas!",
        data: tags
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}