import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../@types/express";
import { ListRequestService } from "../services/ListRequestService";
import { Controller } from "./Controller"

@injectable()
export class ListRequestController extends Controller {
  constructor(
    private service: ListRequestService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let { limit , offset } = req.query as any;

    limit = limit ? +limit : 20;
    offset = offset ? +offset : 0;
    

    res.status(200).json({
      data: {
        requests: await this.service.execute({ limit , offset } as any)
      }
    });
  }
}