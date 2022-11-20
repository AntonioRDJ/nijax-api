import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { DeleteUserService } from "../../services/user/DeleteUserService";
import { Controller } from "../Controller"

@injectable()
export class DeleteUserController extends Controller {
  constructor(
    private service: DeleteUserService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    const id = req.user?.id;

    if(!id){
      throw new createHttpError.BadRequest("Invalid User");
    }

    res.status(200).json({
      data: {
        user: await this.service.execute(id)
      }
    });
  }
}