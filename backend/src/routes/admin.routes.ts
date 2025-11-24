import { Router } from "express";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { AdminController } from "../controllers/admin.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";
import { registerUserAdminValidator } from "../validators/admin/register-user-admin.validator";
import { validateParam } from "../validators/param/param.validator";
import { updateUserAdminValidator } from "../validators/admin/update-user-admin.validator";
import { userExists } from "../middlewares/user-exist.middleware";
import { sanitizeBody } from "../middlewares/sanitize.middlewares";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";

const router = Router();
const adminController = new AdminController;

router.use(checkJwtMiddleware, isAdmin);
router.get('/users', queryParamPaginateValidator, validateRequestMiddleware, adminController.getUserList);
router.post('/users', registerUserAdminValidator, validateRequestMiddleware, sanitizeBody, adminController.createUser);
router.patch(
    '/users/:id',
    validateParam("id"), userExists,
    updateUserAdminValidator, validateRequestMiddleware,
    sanitizeBody,
    adminController.updateUser
);

export default router;