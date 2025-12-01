import { Router } from "express";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { TagRepository } from "../repositories/tag.repository";
import { TagService } from "../services/tag.service";
import { TagController } from "../controllers/tag.controller";

const router = Router();

const tagRepository = new TagRepository;
const tagService = new TagService(tagRepository);
const tagController = new TagController(tagService);

// Solo acceden los usuarios con rol "Admin"
router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin'));

router.get('/', tagController.getTags);

export default router;