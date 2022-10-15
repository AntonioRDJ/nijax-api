import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";
import { Controller } from "./Controller"

@injectable()
export class CreateUserController extends Controller {
  constructor(
    private createUserService: CreateUserService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    let {
      cellphone,
      cpfCnpj,
      email,
      name,
      password,
      isCompany,
      birthDate,
      address,
      fantasyName,
      experiences,
      formations,
      socialNetworks,
    } = req.body;

    birthDate = new Date(birthDate);
    const {accessToken, ...user} = await this.createUserService.execute({
      cellphone,
      cpfCnpj,
      email,
      name,
      password,
      birthDate,
      isCompany,
    }, {
      address,
      fantasyName,
      experiences,
      formations,
      socialNetworks,
    });

    res.status(200).json({
      data: {
        accessToken,
        user,
      }
    });
  }
}