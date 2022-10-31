import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { FindOrderService } from "../../services/order/FindOrderService";
import { Controller } from "../Controller"

@injectable()
export class FindOrderController extends Controller {
  constructor(
    private service: FindOrderService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    console.log("params ", req.params);
    
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