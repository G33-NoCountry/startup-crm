import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { registerUserValidator } from "../validators/auth/register.validator";
import { handlePassportJWTError, handlePassportLocalError, handleValidationErrors } from "../utils/handle-errors";
import { loginValidator } from "../validators/auth/login.validator";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";

const router = Router();
const authController = new AuthController();

router.post('/register', registerUserValidator, handleValidationErrors, sanitizeBody, authController.registerUser);
router.post('/login',
    loginValidator,
    handleValidationErrors,
    handlePassportLocalError,
    sanitizeBody,
    authController.login
);

router.get('/profile', handlePassportJWTError, authController.profile);

export default router;