import { Router } from "express";
import { validateParam } from "../validators/param/param.validator";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import { recordExists } from "../middlewares/model-exist.middleware";
import { Conversation } from "../models";
import { ConversationController } from "../controllers/conversation.controller";
import { MessageRepository } from "../repositories/message.repository";
import { MessageService } from "../services/message.service";
import { queryParamConversationValidator } from "../validators/param/query-conversation.validator";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import updateStatusConversationValidator from "../validators/conversation/update-status-conversation.validator";
import { ConversationRepository } from "../repositories/conversation.repository";
import { ConversationService } from "../services/conversation.service";

const router = Router();

const messageRepository = new MessageRepository;
const conversationRepository = new ConversationRepository;
const messageService = new MessageService(messageRepository);
const conversationService = new ConversationService(conversationRepository);
const conversationController = new ConversationController(conversationService, messageService);

router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin', 'Agente'));

router.get('/:id/messages',
    validateParam("id"),
    validateRequestMiddleware,
    recordExists(Conversation),
    queryParamConversationValidator,
    validateRequestMiddleware,
    conversationController.getMessagesByConversation
);

router.patch('/:id/status',
    updateStatusConversationValidator,
    validateRequestMiddleware,
    recordExists(Conversation),
    conversationController.updateStatus
);

export default router;