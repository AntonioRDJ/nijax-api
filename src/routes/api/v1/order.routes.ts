import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateOrderController } from "../../../controllers/order/CreateOrderController";
import { DeleteOrderController } from "../../../controllers/order/DeleteOrderController";
import { FindOrderController } from "../../../controllers/order/FindOrderController";
import { ListOrderController } from "../../../controllers/order/ListOrderController";
import { UpdateOrderController } from "../../../controllers/order/UpdateOrderController";
import auth from "../../../middlewares/auth";

const router = Router();

router.use(auth);

router.post(
	"/",
	Controller.attachToRouteHandler(CreateOrderController)
);

router.get(
	"/:orderId",
	Controller.attachToRouteHandler(FindOrderController)
);

router.get(
	"/",
	Controller.attachToRouteHandler(ListOrderController)
);

router.put(
	"/:orderId",
	Controller.attachToRouteHandler(UpdateOrderController)
);

router.delete(
	"/:orderId",
	Controller.attachToRouteHandler(DeleteOrderController)
);

export default router;