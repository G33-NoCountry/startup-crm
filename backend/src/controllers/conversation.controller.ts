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
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *         required: true
   *         description: Cantidad de resultados a devolver por página.
   *         example: 3
   *       - in: query
   *         name: before
   *         schema:
   *           type: string
   *         required: false
   *         description: Fecha a partir de la cual se obtendrán los mensajes anteriores.
   *         example: 2025-11-03T19:32:14.000Z
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
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
   *       500:
   *         description: Error interno del servidor
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
   * /api/conversations/{id}/messages:
   *   post:
   *     summary: Enviar un mensaje (Email o WhatsApp)
   *     description: Envía un mensaje a través del canal especificado y lo registra en la base de datos asociado a la conversación.
   *     tags: [Conversations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: ID de la conversación
   *         example: 6
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - content
   *               - channel
   *             properties:
   *               content:
   *                 type: string
   *                 description: Contenido del mensaje a enviar.
   *                 example: "Hola, ¿podemos agendar una reunión?"
   *               channel:
   *                 type: string
   *                 enum: [email, whatsapp]
   *                 description: Canal de envío.
   *                 example: "email"
   *     responses:
   *       201:
   *         description: Mensaje enviado y registrado exitosamente
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
   *                   example: "Mensaje enviado y registrado."
   *                 data:
   *                   type: object
   *                   description: Objeto del mensaje creado (puedes referenciar un esquema Message si lo tienes)
   *       400:
   *         description: Error de validación (contenido vacío o canal inválido)
   *       404:
   *         description: Conversación no encontrada
   *       500:
   *         description: Error interno del servidor
   */
  public sendMessage = async (request: Request, response: Response) => {
    try {
      const conversationId = parseInt(request.params.id);
      const { content, channel } = request.body;

      // Obtenemos el ID del usuario autenticado (Agente/Admin)
      // Usamos 'as any' o una interfaz User si la tienes definida para acceder a .id
      const user = (request as any).user;
      const userId = user.id;

      const message = await this.conversationService.sendMessage(
        conversationId,
        userId,
        content,
        channel
      );

      return response.status(201).json({
        success: true,
        message: "Mensaje enviado y registrado.",
        data: message
      });

    } catch (error: any) {
      // Manejo básico de errores HTTP según el mensaje del servicio
      const statusCode = error.message.includes("no encontrada") || error.message.includes("no tiene") ? 404 : 500;

      return response.status(statusCode).json({
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
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id de la conversación
   *         example: 6
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateStatusConversationRequest'
   *     responses:
   *       200:
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
   *       400:
   *         description: Solicitud inválida
   *       404:
   *         description: No encontrado
   *       500:
   *         description: Error interno del servidor
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