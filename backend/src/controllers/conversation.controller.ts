import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import { Op } from "sequelize";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Endpoints para gestionar conversaciones (solo acceden usuarios "Admin" y "Agente")
 */
export class ConversationController {
  constructor(
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

}