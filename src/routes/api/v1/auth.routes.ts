import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { LoginController } from "../../../controllers/LoginController";

const router = Router();

router.post(
  "/login",
  Controller.attachToRouteHandler(LoginController)
);

export default router;
