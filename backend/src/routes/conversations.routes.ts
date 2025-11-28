import { Router } from "express";
import { validateParam } from "../validators/param/param.validator";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import { recordExists } from "../middlewares/model-exist.middleware";
import { Conversation } from "../models";
import { ConversationService } from "../services/conversation.service";
import { ConversationRepository } from "../repositories/conversation.repository";
import { ConversationController } from "../controllers/conversation.controller";
import { MessageRepository } from "../repositories/message.repository";
import { MessageService } from "../services/message.service";
import { queryParamConversationValidator } from "../validators/param/query-conversation.validator";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";

const router = Router();

const conversationRepository = new ConversationRepository;
const messageRepository = new MessageRepository;
const conversationService = new ConversationService(conversationRepository);
const messageService = new MessageService(messageRepository);
const conversationController = new ConversationController(conversationService, messageService);

router.use(checkJwtMiddleware, acceptRoleMiddleware('Agente'));

router.get('/:id/messages',
    validateParam("id"),
    validateRequestMiddleware,
    recordExists(Conversation),
    queryParamConversationValidator,
    validateRequestMiddleware,
    conversationController.getMessagesByConversation
);

export default router;