import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import contactRoutes from "./contact.routes";
import dealRoutes from "./deal.routes";
import conversationRoutes from "./conversations.routes";
import taskRoutes from "./task.routes";
import dashboardRoutes from "./dashboard.routes";
import messageRouter from './message.routes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/contacts", contactRoutes);
router.use("/deals", dealRoutes);
router.use("/conversations", conversationRoutes);
router.use("/tasks", taskRoutes);
router.use("/dashboard", dashboardRoutes);
router.use('/messages', messageRouter);

export default router;