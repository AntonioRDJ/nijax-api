import { Router } from "express";
import apiRoutes from "./api";
import notFound from "./notFound.routes";

const router = Router();

router.use("/ping", (req, res) => {
  res.status(200).send("pong");
});

router.use("/api", apiRoutes);

router.use(notFound);

export default router;
