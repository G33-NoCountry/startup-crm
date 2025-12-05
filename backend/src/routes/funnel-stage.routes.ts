import { Router } from "express";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { FunnelStageController } from "../controllers/funnel-stage.controller";
import { FunnelStageRepository } from "../repositories/funnel-stage.repository";
import { FunnelStageService } from "../services/funnel-stage.service";
import createFunnelValidator from "../validators/funnel-stage/create-funnel.validator";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";

const router = Router();

router.use(checkJwtMiddleware, acceptRoleMiddleware("Admin"));

const funnelStageRepository = new FunnelStageRepository;
const funnelStageService = new FunnelStageService(funnelStageRepository);
const funnelStageController = new FunnelStageController(funnelStageService);

router.get("/", funnelStageController.getFunnelStages);
router.post("/", createFunnelValidator, validateRequestMiddleware, sanitizeBody, funnelStageController.createFunnelStages);

export default router;