import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { CandidacyOrderService } from "../../services/order/CandidacyOrderService";
import { Controller } from "../Controller";

@injectable()
export class CandidacyOrderController extends Controller {
  constructor(
    private service: CandidacyOrderService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    const orderId = req.params.orderId;

    const userId = req.user?.id!;

    await this.service.execute({orderId, userId});
    
    res.status(200).json({
      data: {
        success: true
      }
    });
  }
}