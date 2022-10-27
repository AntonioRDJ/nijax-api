import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../@types/express";
import { CreateRequestService } from "../services/CreateRequestService";
import { CreateUserService } from "../services/CreateUserService";
import { Controller } from "./Controller"

@injectable()
export class CreateRequestController extends Controller {
  constructor(
    private createRequestService: CreateRequestService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let keys = [
      'title',
      'address',
      'description',
      'serviceId',
    ]

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
        request: await this.createRequestService.execute(req.body)
      }
    });
  }
}