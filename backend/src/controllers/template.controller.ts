import { Request, Response } from "express";
import { TemplateService } from "../services/template.service";
import { TemplateResource } from "../resources/template/template-resource.resource";
import { CreateTemplateDto } from "../dto/template/create-template.dto";
import { User } from "../models";
import { UpdateTemplateDto } from "../dto/template/update-template.dto";

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Endpoints para gestionar plantillas de mensajes (solo acceden usuarios "Admin")
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

  /**
   * @swagger
   * /api/admin/templates:
   *   post:
   *     summary: Crear template
   *     description: Crea un nuevo registro de template
   *     tags: [Templates]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTemplateRequest'
   *     responses:
   *        201:
   *         description: Template creado
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
   *                   example: "Template creado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullTemplate'
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
  public createTemplate = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const body = request.body as CreateTemplateDto;
      body.user_id = id;
      const template = await this.templateService.create(body);
      if (!template)
        throw new Error("No se pudo crear el template");

      return response.status(201).json({
        success: true,
        message: "Template creado!",
        data: TemplateResource.toResponse(template)
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
   * /api/admin/templates/{id}:
   *   put:
   *     summary: Actualizar template  
   *     description: Actualiza el registro de un template
   *     tags: [Templates]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del template
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTemplateRequest'
   *     responses:
   *        200:
   *         description: Template actualizado
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
   *                   example: "Template actualizado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullTemplate'
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
  public updateTemplate = async (request: Request, response: Response) => {
    try {
      const templateId = parseInt(request.params.id);
      const body = request.body as UpdateTemplateDto;
      body.id = templateId;
      const templateUpdated = await this.templateService.update(body);
      if (!templateUpdated)
        throw new Error("No se pudo actualizar el template");

      return response.status(200).json({
        success: true,
        message: "Template actualizado!",
        data: TemplateResource.toResponse(templateUpdated)
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


}