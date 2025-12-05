import { Router } from "express";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { FunnelStageController } from "../controllers/funnel-stage.controller";
import { FunnelStageRepository } from "../repositories/funnel-stage.repository";
import { FunnelStageService } from "../services/funnel-stage.service";

const router = Router();

router.use(checkJwtMiddleware, acceptRoleMiddleware("Admin"));

const funnelStageRepository = new FunnelStageRepository;
const funnelStageService = new FunnelStageService(funnelStageRepository);
const funnelStageController = new FunnelStageController(funnelStageService);

router.get("/", funnelStageController.getFunnelStages);

export default router;