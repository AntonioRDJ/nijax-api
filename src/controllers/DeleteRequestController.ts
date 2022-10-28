import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../@types/express";
import { CreateRequestService } from "../services/CreateRequestService";
import { DeleteRequestService } from "../services/DeleteRequestService";
import { Controller } from "./Controller"

@injectable()
export class DeleteRequestController extends Controller {
  constructor(
    private service: DeleteRequestService,
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
        request: await this.service.execute(id)
      }
    });
  }
}