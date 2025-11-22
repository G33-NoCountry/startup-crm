import { Router } from "express";
import { handlePassportJWTError, handleValidationErrors } from "../utils/handle-errors";
import { AdminController } from "../controllers/admin.controller";
import { isAdmin } from "../middlewares/is-admin.middleware";
import { queryParamPaginateValidator } from "../validators/query-param.validator";

const router = Router();
const adminController = new AdminController;

router.use(handlePassportJWTError, isAdmin);
router.get('/users', queryParamPaginateValidator, handleValidationErrors, adminController.getUserList);

export default router;