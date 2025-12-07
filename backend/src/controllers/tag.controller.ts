import { Request, Response } from "express";
import { TagService } from "../services/tag.service";
import { TagResource } from "../resources/tag/tag-resource.resource";
import { CreateTagDto } from "../dto/tag/create-tag.dto";
import { UpdateTagDto } from "../dto/tag/update-tag.dto";

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
   *     security:
   *       - bearerAuth: []
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

  /**
   * @swagger
   * /api/admin/tags:
   *   post:
   *     summary: Crear Tag
   *     description: Crea un nuevo registro de Tag
   *     tags: [Tags]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTagRequest'
   *     responses:
   *        200:
   *         description: Tag creada
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
   *                   example: "Tag creada!"
   *                 data:
   *                   $ref: '#/components/schemas/FullTag'
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
  public createTag = async (request: Request, response: Response) => {
    try {
      const body = request.body as CreateTagDto;
      const tag = await this.tagService.create(body);

      if (!tag)
        throw new Error("No se pudo crear el registro");

      return response.status(201).json({
        success: true,
        message: "Tag creada!",
        data: TagResource.toResponse(tag)
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
   * /api/admin/tags/{id}:
   *   put:
   *     summary: Actualizar Tag
   *     description: Actualiza el registro de una Tag
   *     tags: [Tags]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la Tag
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTagRequest'
   *     responses:
   *        200:
   *         description: Tag actualizada
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
   *                   example: "Tag actualizada!"
   *                 data:
   *                   $ref: '#/components/schemas/FullTag'
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
  public updateTag = async (request: Request, response: Response) => {
    try {
      const tagId = parseInt(request.params.id);
      const body = request.body as UpdateTagDto;
      body.id = tagId;
      const tagUpdated = await this.tagService.update(body);

      if (!tagUpdated)
        throw new Error("No se pudo actualizar el registro");

      return response.status(201).json({
        success: true,
        message: "Tag actualizada!",
        data: TagResource.toResponse(tagUpdated)
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
   * /api/admin/tags/{id}:
   *   delete:
   *     summary: Eliminar Tag
   *     description: Eliminar registro de una Tag
   *     tags: [Tags]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la Tag
   *     responses:
   *        204:
   *         description: Tag eliminada (sin respuesta)
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
  public deleteTag = async (request: Request, response: Response) => {
    try {
      const tagId = parseInt(request.params.id);
      const tag = await this.tagService.getByPk(tagId);
      if (!tag)
        throw new Error("No se encontró");
      await this.tagService.delete(tag);

      return response.status(204).send();
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}