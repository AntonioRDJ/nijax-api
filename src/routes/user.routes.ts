import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router = Router();

router.use("/", (req, res) => {
  createUser(req, res);
});

router.use("/:userId", () => {

});

export default router;
