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
import { MailService } from '../services/mail.service';
import { WhatsAppApiService } from "../services/whatsapp-api.service";

const router = Router();

const mailService = new MailService();
const messageRepository = new MessageRepository;
const conversationRepository = new ConversationRepository;
const messageService = new MessageService(messageRepository);
const whatsAppService = new WhatsAppApiService;
const conversationService = new ConversationService(
    conversationRepository, 
    messageRepository,      
    mailService,
    whatsAppService 
);
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

router.post(
    '/:id/messages',
    checkJwtMiddleware,
    acceptRoleMiddleware('Admin', 'Agente'),
    conversationController.sendMessage
);

export default router;