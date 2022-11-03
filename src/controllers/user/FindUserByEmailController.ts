import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { FindUserByEmailService } from "../../services/user/FindUserByEmailService";
import { Controller } from "../Controller"

@injectable()
export class FindUserByEmailController extends Controller {
  constructor(
    private service: FindUserByEmailService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    
    const email = req.params.email;

    if(!email){
      throw new createHttpError.BadRequest("Invalid E-mail");
    }

    await this.service.execute(email);

    res.status(200).json({
      message: "User already exists"
    });
  }
}