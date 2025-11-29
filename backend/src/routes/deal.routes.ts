import { Router, Request, Response, NextFunction } from "express";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { DealController } from "../controllers/deal.controller";
import { DealService } from "../services/deal.service";
import { DealRepository } from "../repositories/deal.repository";
import validateRequestMiddleware from "../middlewares/validate-request.middleware"; 
import { moveDealValidator } from "../validators/deal/move-deal.validator";
import { createDealValidator } from "../validators/deal/create-deal.validator";

const router = Router();

const dealRepository = new DealRepository();
const dealService = new DealService(dealRepository);
const dealController = new DealController(dealService);

router.use(checkJwtMiddleware);

router.post(
    '/',
    acceptRoleMiddleware('Agente', 'Admin', 'Manager'),
    createDealValidator,
    validateRequestMiddleware,
    dealController.createDeal
);

router.get('/',
    acceptRoleMiddleware('Agente', 'Admin', 'Manager'),
    dealController.getDeals
);

router.put('/:id/funnel-stage',
    acceptRoleMiddleware('Agente', 'Admin', 'Manager'), 
    moveDealValidator,          
    validateRequestMiddleware,  
    dealController.updateDealStage
);

export default router;