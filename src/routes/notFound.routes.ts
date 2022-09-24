import { Router } from "express";

const router = Router();

router.use((req, res) => {
  return res.status(404).send("Route Not Found");
});

export default router;
