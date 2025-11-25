import { Router } from "express";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { DealController } from "../controllers/deal.controller";
import { DealService } from "../services/deal.service";
import { DealRepository } from "../repositories/deal.repository";

const router = Router();

const dealRepository = new DealRepository();
const dealService = new DealService(dealRepository);
const dealController = new DealController(dealService);

router.use(checkJwtMiddleware);

router.get('/',
    acceptRoleMiddleware('Agente', 'Admin', 'Manager'),
    dealController.getDeals
);

export default router;