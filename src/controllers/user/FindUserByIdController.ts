import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { FindUserByIdService } from "../../services/user/FindUserByIdService";
import { Controller } from "../Controller"

@injectable()
export class FindUserByIdController extends Controller {
  constructor(
    private service: FindUserByIdService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    
    const id = req.params.id;

    if(!id){
      throw new createHttpError.BadRequest("Invalid Id");
    }

    const user = await this.service.execute(id);

    res.status(200).json({
      data: {
        user
      }
    });
  }
}