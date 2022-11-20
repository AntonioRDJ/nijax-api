import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateUserController } from "../../../controllers/user/CreateUserController";
import { DeleteUserController } from "../../../controllers/user/DeleteUserController";
import { FindUserByCellphoneController } from "../../../controllers/user/FindUserByCellphoneController";
import { FindUserByCpfCnpjController } from "../../../controllers/user/FindUserByCpfCnpjController";
import { FindUserByEmailController } from "../../../controllers/user/FindUserByEmailController";
import { FindUserByIdController } from "../../../controllers/user/FindUserByIdController";
import { UpdateUserController } from "../../../controllers/user/UpdateUserController";
import auth from "../../../middlewares/auth";

const router = Router();

router.post(
  "/",
  Controller.attachToRouteHandler(CreateUserController)
);

router.get(
  "/by-email/:email",
  Controller.attachToRouteHandler(FindUserByEmailController)
);

router.get(
  "/by-cellphone/:cellphone",
  Controller.attachToRouteHandler(FindUserByCellphoneController)
);

router.get(
  "/by-cpf-cnpj/:cpfCnpj",
  Controller.attachToRouteHandler(FindUserByCpfCnpjController)
);

router.get(
  "/:id",
  auth,
  Controller.attachToRouteHandler(FindUserByIdController)
);

router.patch(
  "/",
  auth,
  Controller.attachToRouteHandler(UpdateUserController)
);

router.delete(
  "/",
  auth,
  Controller.attachToRouteHandler(DeleteUserController)
);

export default router;
