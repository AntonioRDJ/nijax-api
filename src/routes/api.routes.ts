import { Router } from "express";
import userRoutes from "./user.routes";
import requestRoutes from "./request.routes";
import serviceRoutes from "./service.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/request", requestRoutes);
router.use("/service", serviceRoutes);

export default router;
