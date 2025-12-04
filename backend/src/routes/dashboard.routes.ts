import { Router } from "express";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { MetricController } from "../controllers/metric.controller";
import { MetricRepository } from "../repositories/metric.repository";
import { MetricService } from "../services/metric.service";

const router = Router();

router.use(checkJwtMiddleware, acceptRoleMiddleware("Admin", "Agente", "Manager"));

const metricRepository = new MetricRepository;
const metricService = new MetricService(metricRepository);
const metricController = new MetricController(metricService);

// Contactos Activos, Mensajes Enviados, Tasa de Respuesta, Pipeline
router.get("/metrics", metricController.getMetrics);
router.get("/funnel-progress", metricController.getFunnelProgress);
router.get("/pending-tasks", metricController.getPendingTasks);

export default router;