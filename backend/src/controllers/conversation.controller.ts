import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import { Op } from "sequelize";
import { ConversationService } from "../services/conversation.service";
import { UpdateStatusDto } from "../dto/conversation/update-status.dto";
import { ConversationResource } from "../resources/conversation/conversation.resource";

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Endpoints para gestionar conversaciones (solo acceden usuarios "Admin" y "Agente")
 */
export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService,
  ) { }

  /**
   * @swagger
   * /api/conversations/{id}/messages:
   *   get:
   *     summary: Obtener mensajes de una conversación
   *     description: Obtener los mensajes paginados de una conversación
   *     tags: [Conversations]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la conversación
   *         example: 6
   * 
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *         required: true
   *         description: Cantidad de resultados a devolver por página.
   *         example: 3
   * 
   *       - in: query
   *         name: before
   *         schema:
   *           type: string
   *         required: false
   *         description: Fecha a partir de la cual se obtendrán los mensajes anteriores. Debe estar en formato ISO 8601. Generalmente corresponde al `created_at` del mensaje más antiguo ya cargado.
   *         example: 2025-11-03T19:32:14.000Z
   * 
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Mensajes obtenidos
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
   *                   example: "Mensajes obtenidos!"
   *                 data:
   *                   $ref: '#/components/schemas/PaginateMessages'
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
  public getMessagesByConversation = async (request: Request, response: Response) => {
    try {
      const { limit, before } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      const conversationId = parseInt(request.params.id);
      const where = before
        ? { conversation_id: conversationId, created_at: { [Op.lt]: new Date(before as string) } }
        : { conversation_id: conversationId };

      const messages = await this.messageService.getMessagesByConversations(
        parsedLimit, where
      );

      return response.status(200).json({
        success: true,
        message: "Mensajes obtenidos!",
        data: messages
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
   * /api/conversations/{id}/status:
   *   patch:
   *     summary: Actualizar el estado de una conversación
   *     description: Actualiza la propiedad `status` en `true` = `activo` o `false` = `inactivo`
   *     tags: [Conversations]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la conversación
   *         example: 6
   * 
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateStatusConversationRequest'
   * 
   *     responses:
   *        200:
   *         description: Conversación actualizada
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
   *                   example: "Conversación actualizada!"
   *                 data:
   *                   $ref: '#/components/schemas/FullConversation'
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
  public updateStatus = async (request: Request, response: Response) => {
    try {
      const body = request.body as UpdateStatusDto;
      const conversationId = parseInt(request.params.id);
      body.id = conversationId;
      const conversationUpdated = await this.conversationService.update(body);
      if (!conversationUpdated)
        throw new Error("No se pudo actualizar la conversación");

      return response.status(200).json({
        success: true,
        message: "Conversación actualizada!",
        data: ConversationResource.toResponse(conversationUpdated)
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}