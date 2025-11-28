import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { MessageService } from "../services/message.service";
import { Op } from "sequelize";

export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService,
  ) { }

  public getMessagesByConversation = async (request: Request, response: Response) => {
    try {
      const { after, limit, before } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      const conversationId = parseInt(request.params.id);
      const where = {
        conversation_id: conversationId,
        created_at: { [Op.lt]: before }
      };
      const messages = await this.messageService.getMessagesByConversations(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
        [], where
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