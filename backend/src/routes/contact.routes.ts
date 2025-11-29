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
import { validateParam } from "../validators/param/param.validator";
import { contactExists } from "../middlewares/contact-exist.middleware";
import { updateContactValidator } from "../validators/contact/update-contact.validator";
import { queryFunnelStageExists, queryParamFunnelStageIdValidator } from "../validators/param/query-funnel-stage.validator";

const router = Router();
const contactRepository = new ContactRepository;
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

// Solo acceden los usuarios con rol "Admin" y "Agente"
router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin', 'Agente'));
router.get('/',
    queryParamPaginateValidator,
    queryParamFunnelStageIdValidator,
    validateRequestMiddleware,
    queryFunnelStageExists,
    contactController.getContacts
);
router.post('/', registerContactValidator, validateRequestMiddleware, sanitizeBody, contactController.registerContact);
router.get('/:id', validateParam("id"), validateRequestMiddleware, contactExists, contactController.getContact);
router.patch('/:id',
    validateParam("id"),
    validateRequestMiddleware,
    contactExists,
    updateContactValidator,
    validateRequestMiddleware,
    sanitizeBody,
    contactController.updateContact
);
router.delete('/:id', validateParam("id"), validateRequestMiddleware, contactExists, contactController.deleteContact);


export default router;