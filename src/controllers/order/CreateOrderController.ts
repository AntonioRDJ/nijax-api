import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { Controller } from "../Controller"

@injectable()
export class CreateOrderController extends Controller {
  constructor(
    private createOrderService: CreateOrderService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let keys = [
      'title',
      'address',
      'description',
      'service',
    ];

    for (const key of keys) {
      if(!req.body[key]){
        res.status(400).json({
          data: {
            error: `Invalid field '${key}'`
          }
        });
      }
    }

    req.body.userId = req.user?.id;

    res.status(200).json({
      data: {
        order: await this.createOrderService.execute(req.body)
      }
    });
  }
}