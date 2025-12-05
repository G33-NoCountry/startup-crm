import { Router } from "express";
import { TemplateController } from "../controllers/template.controller";
import { TemplateService } from "../services/template.service";
import { TemplateRepository } from "../repositories/template.repository";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";
import createTemplateValidator from "../validators/template/create-template.validator";

const router = Router();

const templateRepository = new TemplateRepository;
const templateService = new TemplateService(templateRepository);
const templateController = new TemplateController(templateService);

router.get("/",
    queryParamPaginateValidator,
    validateRequestMiddleware,
    templateController.getTemplates
);
router.post("/", createTemplateValidator, validateRequestMiddleware, sanitizeBody, templateController.createTemplate);


export default router;