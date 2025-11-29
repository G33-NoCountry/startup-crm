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

const router = Router();

const messageRepository = new MessageRepository;
const messageService = new MessageService(messageRepository);
const conversationController = new ConversationController(messageService);

router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin', 'Agente'));

router.get('/:id/messages',
    validateParam("id"),
    validateRequestMiddleware,
    recordExists(Conversation),
    queryParamConversationValidator,
    validateRequestMiddleware,
    conversationController.getMessagesByConversation
);

export default router;