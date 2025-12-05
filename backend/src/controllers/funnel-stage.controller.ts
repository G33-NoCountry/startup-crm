import { Request, Response } from "express";
import { FunnelStageService } from "../services/funnel-stage.service";

/**
 * @swagger
 * tags:
 *   name: Funnel Stages
 *   description: Endpoints para gestionar las etapas de un deal (solo acceden usuarios "Admin")
 */
export class FunnelStageController {
  constructor(
    private funnelStageService: FunnelStageService,
  ) { }

    /**
   * @swagger
   * /api/funnel-stages:
   *   get:
   *     summary: Obtener funnel 
   *     description: Obtiene todos los funnel stage
   *     tags: [Funnel Stages]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: 
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
   *                   example: "Funnel Stages obtenidos!"
   *                 data:
   *                   $ref: '#/components/schemas/FullFunnelStage'
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
  public getFunnelStages = async (request: Request, response: Response) => {
    try {
      const funnelStages = await this.funnelStageService.getFunnels();
      return response.status(200).json({
        success: true,
        message: "Funnel Stages obtenidos!",
        data: funnelStages
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}