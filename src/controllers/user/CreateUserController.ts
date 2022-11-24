import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GetLocationService } from "../../services/location/GetLocationService";
import { CreateProvider, CreateUser, CreateUserService } from "../../services/user/CreateUserService";
import { Controller } from "../Controller"

@injectable()
export class CreateUserController extends Controller {
  constructor(
    private createUserService: CreateUserService,
    private getLocationService: GetLocationService,
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
      cep,
      street,
      district,
      city,
      state,
      number,
      service,
      showNotifications,
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

    let createProvider: CreateProvider = {
      fantasyName,
      cep,
      street,
      district,
      city,
      state,
      number,
      service,
      showNotifications,
      experiences,
      formations,
      socialNetworks,
      lat: "",
      lng: "",
    };

    if(isCompany) {
      const location = await this.getLocationService.execute({
        cep,
        street,
        district,
        city,
        state,
        number,
      });
      createProvider.lat = location.lat;
      createProvider.lng = location.lng;
    }

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