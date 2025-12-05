import { Request, Response } from "express";
import { FunnelStageService } from "../services/funnel-stage.service";
import { CreateFunnelStageDto } from "../dto/funnel-stage/create-funnel.dto";
import { UpdateFunnelStageDto } from "../dto/funnel-stage/update-funnel.dto";
import { FunnelStageResource } from "../resources/funnel-stage/funnel-stage-resource.resource";
import { ReorderFunnelStagesDto } from "../dto/funnel-stage/reorder-funnels.dto";

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
   * /api/admin/funnel-stages:
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
   *                   $ref: '#/components/schemas/ListFunnelStage'
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
   * /api/admin/funnel-stages:
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
   *         description: Funnel creado
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
        data: FunnelStageResource.toResponse(funnelStage)
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
   * /api/admin/funnel-stages/{id}:
   *   put:
   *     summary: Actualizar funnel 
   *     description: Actualiza un registro de funnel
   *     tags: [Funnel Stages]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del funnel
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateFunnelRequest'
   *     responses:
   *        200:
   *         description: Funnel actualizado
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
   *                   example: "Funnel Stages actualizado!"
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
   *        404:
   *         description: No encontrado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/NotFound'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public updateFunnelStage = async (request: Request, response: Response) => {
    try {
      const funnelId = parseInt(request.params.id);
      const body = request.body as UpdateFunnelStageDto;
      body.id = funnelId;
      const funnelStageUpdated = await this.funnelStageService.update(body);
      if (!funnelStageUpdated)
        throw new Error("No se pudo actualizar el funnel");

      return response.status(200).json({
        success: true,
        message: "Funnel Stage actualizado!",
        data: FunnelStageResource.toResponse(funnelStageUpdated)
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
   * /api/admin/funnel-stages/reorder:
   *   patch:
   *     summary: Reordenar funnels  
   *     description: Actualiza el orden lógico de los funnel
   *     tags: [Funnel Stages]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ReorderFunnelRequest'
   *     responses:
   *        200:
   *         description: Funnels reordenados
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
   *                   example: "Funnel Stages ordenados!"
   *                 data:
   *                   $ref: '#/components/schemas/ListFunnelStage'
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
  public reorderFunnelStages = async (request: Request, response: Response) => {
    try {
      const body = request.body as ReorderFunnelStagesDto;
      const funnelStages = await this.funnelStageService.reorder(body);

      return response.status(200).json({
        success: true,
        message: "Funnel Stage ordenados!",
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
   * /api/admin/funnel-stages/{id}:
   *   delete:
   *     summary: Eliminar funnel 
   *     description: Elimina un registro de funnel
   *     tags: [Funnel Stages]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del funnel
   *     responses:
   *        204:
   *         description: Funnel eliminado (sin contenido)
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
   *        404:
   *         description: No encontrado
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/NotFound'
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public deleteFunnelStage = async (request: Request, response: Response) => {
    try {
      const funnelId = parseInt(request.params.id);
      const funnel = await this.funnelStageService.getByPk(funnelId);
      if (!funnel)
        throw new Error("No se encontró");
      await this.funnelStageService.delete(funnel);

      return response.status(204).send();
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}