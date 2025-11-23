import { Router } from "express";
import { handlePassportJWTError, handleValidationErrors } from "../utils/handle-errors";
import { AdminController } from "../controllers/admin.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { queryParamPaginateValidator } from "../validators/query-param.validator";
import { registerUserAdminValidator } from "../validators/admin/register-user-admin.validator";
import { validateParam } from "../validators/param/param.validator";
import { updateUserAdminValidator } from "../validators/admin/update-user-admin.validator";
import { userExists } from "../middlewares/user-exist.middleware";

const router = Router();
const adminController = new AdminController;

router.use(handlePassportJWTError, isAdmin);
router.get('/users', queryParamPaginateValidator, handleValidationErrors, adminController.getUserList);
router.post('/users', registerUserAdminValidator, handleValidationErrors, adminController.createUser);
router.patch(
    '/users/:id',
    validateParam("id"), userExists,
    updateUserAdminValidator, handleValidationErrors,
    adminController.updateUser
);

export default router;