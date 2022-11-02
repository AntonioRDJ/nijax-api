import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateProvider, CreateUser, CreateUserService } from "../../services/user/CreateUserService";
import { Controller } from "../Controller"

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
      fantasyName,
      address,
      service,
      experiences,
      formations,
      socialNetworks,
    } = req.body;

    const createUser: CreateUser = {
      cellphone,
      cpfCnpj,
      email,
      name,
      password,
      isCompany,
      birthDate,
    };

    const createProvider: CreateProvider = {
      fantasyName,
      address,
      service,
      experiences,
      formations,
      socialNetworks,
    };

    createUser.birthDate = new Date(createUser.birthDate).toISOString();
    
    const {accessToken, ...user} = await this.createUserService.execute(createUser, createProvider);

    res.status(200).json({
      data: {
        accessToken,
        user,
      }
    });
  }
}