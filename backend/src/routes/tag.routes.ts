import { Router } from "express";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { TagRepository } from "../repositories/tag.repository";
import { TagService } from "../services/tag.service";
import { TagController } from "../controllers/tag.controller";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import createTagValidator from "../validators/tag/create-tag.validator";

const router = Router();

const tagRepository = new TagRepository;
const tagService = new TagService(tagRepository);
const tagController = new TagController(tagService);

// Solo acceden los usuarios con rol "Admin"
router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin'));

router.get('/', tagController.getTags);
router.post('/', createTagValidator, validateRequestMiddleware, sanitizeBody, tagController.createTag);

export default router;