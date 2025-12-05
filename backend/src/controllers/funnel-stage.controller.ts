import { Request, Response } from "express";
import { FunnelStageService } from "../services/funnel-stage.service";
import { CreateFunnelStageDto } from "../dto/funnel-stage/create-funnel.dto";

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

  /**
 * @swagger
 * /api/funnel-stages:
 *   post:
 *     summary: Crear funnel 
 *     description: Crea un nuevo registro de funnel
 *     tags: [Funnel Stages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFunnelRequest'
 *     responses:
 *        201:
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
 *                   example: "Funnel Stages creado!"
 *                 data:
 *                   $ref: '#/components/schemas/FullFunnelStage'
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
  public createFunnelStages = async (request: Request, response: Response) => {
    try {
      const body = request.body as CreateFunnelStageDto;
      const funnelStage = await this.funnelStageService.create(body);
      if (!funnelStage)
        throw new Error("No se pudo crear el funnel");

      return response.status(201).json({
        success: true,
        message: "Funnel Stage creado!",
        data: funnelStage
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}