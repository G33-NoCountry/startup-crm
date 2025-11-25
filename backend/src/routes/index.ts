import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import contactRoutes from "./contact.routes";
import dealRoutes from "./deal.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/contacts", contactRoutes);
router.use("/deals", dealRoutes);

export default router;