import { Request, Response } from "express";
import { TemplateService } from "../services/template.service";

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Endpoints para gestionar plantillas de mensajes
 */
export class TemplateController {
  constructor(
    private templateService: TemplateService,
  ) { }

  /**
   * @swagger
   * /api/admin/templates:
   *   get:
   *     summary: Obtener templates
   *     description: Obtiene todos los templates paginados
   *     tags: [Templates]
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
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
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Templates obtenidos
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
   *                   example: "Templates obtenidos!"
   *                 data:
   *                   $ref: '#/components/schemas/PaginateTemplates'
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
  public getTemplates = async (request: Request, response: Response) => {
    try {
      const { limit, after, before } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      const templates = await this.templateService.getTemplates(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
      );
      return response.status(200).json({
        success: true,
        message: "Templates obtenidos!",
        data: templates
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}