import { Router } from "express";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import queryParamTaskValidator from "../validators/param/query-task.validator";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";

const router = Router();

const taskRepository = new TaskRepository;
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Solo acceden los usuarios con rol "Admin" y "Agente"
router.use(checkJwtMiddleware, acceptRoleMiddleware('Admin', 'Agente'));

router.get('/',
    queryParamPaginateValidator,
    queryParamTaskValidator,
    validateRequestMiddleware,
    taskController.getTasks
);

export default router;