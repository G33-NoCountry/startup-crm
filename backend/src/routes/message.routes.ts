// src/routes/message.routes.ts

import { Router } from 'express';
import { checkJwtMiddleware } from '../middlewares/authenticate.middleware';
import { acceptRoleMiddleware } from '../middlewares/check-role.middleware';
import { MessageController } from '../controllers/message.controller';
import { sendMailValidator } from '../validators/message/send-mail.validator';
import { TemplateService } from '../services/template.service';
import { TemplateRepository } from '../repositories/template.repository';
import { MailService } from '../services/mail.service';

const router = Router();

const mailService = new MailService();

const templateRepository = new TemplateRepository();

const templateService = new TemplateService(templateRepository, mailService);

const messageController = new MessageController(templateService);
router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin'));

router.post(
    '/send-email',
    sendMailValidator, 
    messageController.sendMailFromTemplate 
);

export default router;