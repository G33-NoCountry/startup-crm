import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import contactRoutes from "./contact.routes";
import dealRoutes from "./deal.routes";
import conversationRoutes from "./conversations.routes";
import taskRoutes from "./task.routes";
import dashboardRoutes from "./dashboard.routes";
import messageRouter from './message.routes';
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { FunnelStageController } from "../controllers/funnel-stage.controller";
import { FunnelStageRepository } from "../repositories/funnel-stage.repository";
import { FunnelStageService } from "../services/funnel-stage.service";

const router = Router();

const funnelStageRepository = new FunnelStageRepository();
const funnelStageService = new FunnelStageService(funnelStageRepository);
const funnelStageController = new FunnelStageController(funnelStageService);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/contacts", contactRoutes);
router.use("/deals", dealRoutes);
router.use("/conversations", conversationRoutes);
router.use("/tasks", taskRoutes);
router.use("/dashboard", dashboardRoutes);
router.use('/messages', messageRouter);
router.get('/funnel-stages', checkJwtMiddleware, funnelStageController.getFunnelStages);

export default router;