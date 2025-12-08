import { Router } from "express";
import { TemplateController } from "../controllers/template.controller";
import { TemplateService } from "../services/template.service";
import { TemplateRepository } from "../repositories/template.repository";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";
import createTemplateValidator from "../validators/template/create-template.validator";
import { validateParam } from "../validators/param/param.validator";
import updateTemplateValidator from "../validators/template/update-template.validator";
import { recordExists } from "../middlewares/model-exist.middleware";
import { Template } from "../models";

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
router.put(
    "/:id",
    validateParam("id"),
    validateRequestMiddleware,
    recordExists(Template),
    updateTemplateValidator,
    validateRequestMiddleware,
    sanitizeBody,
    templateController.updateTemplate
);
router.delete(
    "/:id",
    validateParam("id"),
    validateRequestMiddleware,
    recordExists(Template),
    templateController.deleteTemplate
);


export default router;