import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../@types/express";
import { CreateRequestService } from "../services/CreateRequestService";
import { CreateUserService } from "../services/CreateUserService";
import { UpdateRequestService } from "../services/UpdateRequestService";
import { Controller } from "./Controller"

@injectable()
export class UpdateRequestController extends Controller {
  constructor(
    private service: UpdateRequestService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let keys = [
      'title',
      'address',
      'description',
      'service',
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

    req.body.id = +req.params.requestId;

    if(isNaN(req.body.id)){
      throw new createHttpError.BadRequest("Invalid Request Id");
    }
    
    res.status(200).json({
      data: {
        request: await this.service.execute(req.body)
      }
    });
  }
}