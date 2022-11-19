import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { FindAddressByLocationController } from "../../../controllers/location/FindAddressByLocationController";

const router = Router();

router.get(
  "/address",
  Controller.attachToRouteHandler(FindAddressByLocationController)
);

export default router;
