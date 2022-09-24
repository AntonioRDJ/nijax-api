import { Router } from "express";
import apiRoutes from "./api.routes";

const router = Router();

router.use("/ping", (req, res) => {
  res.status(200).send("pong");
});

router.use("/api", apiRoutes);

export default router;
