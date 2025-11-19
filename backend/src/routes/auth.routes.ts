import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { registerUserValidator } from "../validators/auth/register.validator";
import { handleValidationErrors } from "../utils/handle-errors";

const router = Router();
const authController = new AuthController();

router.post('/register', registerUserValidator, handleValidationErrors, authController.registerUser);

export default router;