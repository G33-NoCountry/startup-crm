import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { updateUserValidator } from "../validators/user/update-user.validator";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";

const router = Router();
const userController = new UserController;

router.use(checkJwtMiddleware);
router.get('/me', userController.getUserLogin);
router.patch('/me', updateUserValidator, validateRequestMiddleware, sanitizeBody, userController.updateUser);

export default router;