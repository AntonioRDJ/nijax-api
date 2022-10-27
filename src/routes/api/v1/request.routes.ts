import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateRequestController } from "../../../controllers/CreateRequestController";
import auth from "../../../middlewares/auth";

const router = Router();

router.use(auth);

router.post(
    "/",
    Controller.attachToRouteHandler(CreateRequestController)
);

router.use("/:requestId", () => {

});

export default router;
