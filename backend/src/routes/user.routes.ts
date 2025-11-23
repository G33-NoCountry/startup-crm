import { Router } from "express";
import { handlePassportJWTError, handleValidationErrors } from "../utils/handle-errors";
import { UserController } from "../controllers/user.controller";
import { updateUserValidator } from "../validators/user/update-user.validator";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";

const router = Router();
const userController = new UserController;

router.use(handlePassportJWTError);
router.get('/me', userController.getUserLogin);
router.patch('/me', updateUserValidator, handleValidationErrors, sanitizeBody, userController.updateUser);

export default router;