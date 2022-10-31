import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";
import { Controller } from "../Controller"

@injectable()
export class DeleteOrderController extends Controller {
  constructor(
    private service: DeleteOrderService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    const id = req.params.orderId;

    if(!id){
      throw new createHttpError.BadRequest("Invalid Order Id");
    }

    res.status(200).json({
      data: {
        order: await this.service.execute(id)
      }
    });
  }
}