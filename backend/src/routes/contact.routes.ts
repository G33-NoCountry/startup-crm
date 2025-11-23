import { Router } from "express";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { ContactController } from "../controllers/contact.controller";
import { ContactService } from "../services/contact.service";
import { ContactRepository } from "../repositories/contact.repository";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";
import { registerContactValidator } from "../validators/contact/register-contact.validator";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";

const router = Router();
const contactRepository = new ContactRepository;
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

// Solo acceden los usuarios con rol "Agente"
router.use(checkJwtMiddleware, acceptRoleMiddleware('Agente'));
router.get('/', queryParamPaginateValidator, validateRequestMiddleware, contactController.getContacts);
router.post('/', registerContactValidator, validateRequestMiddleware, sanitizeBody, contactController.registerContact);

export default router;