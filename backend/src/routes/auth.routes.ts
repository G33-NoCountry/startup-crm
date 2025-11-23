import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { registerUserValidator } from "../validators/auth/register.validator";
import { passportLocalMiddleware, checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import validateRequest from "../middlewares/validate-request.middleware";
import { loginValidator } from "../validators/auth/login.validator";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";

const router = Router();
const authController = new AuthController();

router.post('/register', registerUserValidator, validateRequest, sanitizeBody, authController.registerUser);
router.post('/login',
    loginValidator,
    validateRequest,
    passportLocalMiddleware,
    sanitizeBody,
    authController.login
);

router.get('/profile', checkJwtMiddleware, authController.profile);

export default router;