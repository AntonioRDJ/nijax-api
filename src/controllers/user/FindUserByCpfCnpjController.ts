import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { FindUserByCpfCnpjService } from "../../services/user/FindUserByCpfCnpjService";
import { Controller } from "../Controller"

@injectable()
export class FindUserByCpfCnpjController extends Controller {
  constructor(
    private service: FindUserByCpfCnpjService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    
    const cpfCnpj = parseInt(req.params.cpfCnpj);

    if(!cpfCnpj){
      throw new createHttpError.BadRequest("Invalid CPF or CNPJ");
    }

    await this.service.execute(cpfCnpj);

    res.status(200).json({
      message: "User already exists"
    });
  }
}