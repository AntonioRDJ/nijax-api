import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../@types/express";
import { FindRequestService } from "../services/FindRequestService";
import { Controller } from "./Controller"

@injectable()
export class FindRequestController extends Controller {
  constructor(
    private service: FindRequestService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    const id = +req.params.requestId;

    if(isNaN(id)){
      throw new createHttpError.BadRequest("Invalid Request Id");
    }

    res.status(200).json({
      data: {
        requests: await this.service.execute(id)
      }
    });
  }
}