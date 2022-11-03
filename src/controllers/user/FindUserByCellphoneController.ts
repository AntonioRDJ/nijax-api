import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { FindUserByCellphoneService } from "../../services/user/FindUserByCellphoneService";
import { Controller } from "../Controller"

@injectable()
export class FindUserByCellphoneController extends Controller {
  constructor(
    private service: FindUserByCellphoneService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    
    const cellphone = req.params.cellphone;

    if(!cellphone){
      throw new createHttpError.BadRequest("Invalid Cellphone");
    }

    await this.service.execute(cellphone);

    res.status(200).json({
      message: "User already exists"
    });
  }
}