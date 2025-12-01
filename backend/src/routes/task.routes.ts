import { Router } from "express";
import validateRequestMiddleware from "../middlewares/validate-request.middleware";
import queryParamTaskValidator from "../validators/param/query-task.validator";
import { checkJwtMiddleware } from "../middlewares/authenticate.middleware";
import { acceptRoleMiddleware } from "../middlewares/check-role.middleware";
import { TaskController } from "../controllers/task.controller";
import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { queryParamPaginateValidator } from "../validators/param/query-param.validator";
import createTaskValidator from "../validators/task/create-task.validator";
import updateTaskValidator from "../validators/task/update-task.validator";
import { recordExists } from "../middlewares/model-exist.middleware";
import { Task } from "../models";
import { validateParam } from "../validators/param/param.validator";

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

router.post('/', createTaskValidator, validateRequestMiddleware, taskController.createTask);
router.patch('/:id', validateParam("id"), updateTaskValidator, validateRequestMiddleware, recordExists(Task), taskController.updateTask);

export default router;