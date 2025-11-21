import { Router } from "express";
import { handlePassportJWTError, handleValidationErrors } from "../utils/handle-errors";
import { UserController } from "../controllers/user.controller";
import { updateUserValidator } from "../validators/user/update-user.validator";

const router = Router();
const userController = new UserController;

router.use(handlePassportJWTError);
router.get('/me', userController.getUserLogin);
router.patch('/me', updateUserValidator, handleValidationErrors, userController.updateUser);

export default router;