import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateUserController } from "../../../controllers/user/CreateUserController";

const router = Router();

router.post(
  "/",
  Controller.attachToRouteHandler(CreateUserController)
);

router.use("/:userId", (req, res) => {
  
});

export default router;
