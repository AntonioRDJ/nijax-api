import { Router } from "express";
import userRoutes from "./user.routes";
import orderRoutes from "./order.routes";
import serviceRoutes from "./service.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/service", serviceRoutes);

export default router;
