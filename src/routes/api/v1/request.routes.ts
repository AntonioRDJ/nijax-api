import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateRequestController } from "../../../controllers/CreateRequestController";
import { DeleteRequestController } from "../../../controllers/DeleteRequestController";
import { FindRequestController } from "../../../controllers/FindRequestController";
import { ListRequestController } from "../../../controllers/ListRequestController";
import { UpdateRequestController } from "../../../controllers/UpdateRequestController";
import auth from "../../../middlewares/auth";

const router = Router();

router.use(auth);

router.post(
    "/",
    Controller.attachToRouteHandler(CreateRequestController)
);

router.get(
    "/:requestId",
    Controller.attachToRouteHandler(FindRequestController)
);

router.get(
    "/",
    Controller.attachToRouteHandler(ListRequestController)
);



router.put(
    "/:requestId",
    Controller.attachToRouteHandler(UpdateRequestController)
);

router.delete(
    "/:requestId",
    Controller.attachToRouteHandler(DeleteRequestController)
);

export default router;
