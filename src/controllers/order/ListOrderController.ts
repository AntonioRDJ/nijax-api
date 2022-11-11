import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { Controller } from "../Controller";
import { ListOrderService } from "../..//services/order/ListOrderService";

@injectable()
export class ListOrderController extends Controller {
  constructor(
    private service: ListOrderService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let {
      limit,
      offset,
      service,
      forProvider,
      onlyCandidate,
    } = req.query as any;

    const userId = req.user?.id!;
    
    limit = limit ? +limit : 20;
    offset = offset ? +offset : 0;
    

    res.status(200).json({
      data: {
        orders: await this.service.execute({ limit, offset, userId, service, forProvider, onlyCandidate } as any)
      }
    });
  }
}