import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { CreateUserController } from "../../../controllers/user/CreateUserController";
import { FindUserByCellphoneController } from "../../../controllers/user/FindUserByCellphoneController";
import { FindUserByCpfCnpjController } from "../../../controllers/user/FindUserByCpfCnpjController";
import { FindUserByEmailController } from "../../../controllers/user/FindUserByEmailController";

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

export default router;
