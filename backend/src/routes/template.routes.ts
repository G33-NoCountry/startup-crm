import { Router } from "express";
import { TemplateController } from "../controllers/template.controller";
import { TemplateService } from "../services/template.service";
import { TemplateRepository } from "../repositories/template.repository";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";

const router = Router();

const templateRepository = new TemplateRepository;
const templateService = new TemplateService(templateRepository);
const templateController = new TemplateController(templateService);

router.get("/",
    queryParamPaginateValidator,
    validateRequestMiddleware,
    templateController.getTemplates
);

export default router;