import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateUserController } from "../../../controllers/CreateUserController";

const router = Router();

router.post(
  "/",
  Controller.attachToRouteHandler(CreateUserController)
);

router.use("/:userId", (req, res) => {
  
});

export default router;
