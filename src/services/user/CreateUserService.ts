import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import { signAccessToken } from "../../utils/jwt";
import { generateHash } from "../../utils/bcrypt";
import createHttpError from "http-errors";
import { Service } from "../../utils/constants";
import { Experience, Formation, SocialNetwork } from "../../types/provider";
import { Prisma } from "@prisma/client";

@injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(createUser: CreateUser, createProvider: CreateProvider) {
    createUser.password = generateHash(createUser.password);

    const foundUser = await this.userRepository.findByEmail(createUser.email);

    if(foundUser){
      throw new createHttpError.BadRequest("Email invalid");
    }
    let user = await this.userRepository.create({
      ...createUser,
      provider: createUser.isCompany ? {
        create: {
          ...createProvider,
          fantasyName: createProvider.fantasyName ?? "",
          lat: parseFloat(createProvider.lat),
          lng: parseFloat(createProvider.lng),
          experiences: createProvider.experiences as Prisma.JsonArray,
          formations: createProvider.formations as Prisma.JsonArray,
          socialNetworks: createProvider.socialNetworks as Prisma.JsonArray,
        },
      } : undefined,
    });
    
    const accessToken = signAccessToken({
      id: user.id,
    });
    const {password: rPassword , ...userWithoutPassword} = user;
    return {...userWithoutPassword, accessToken};
  }
}

export interface CreateUser {
  cellphone: string;
  cpfCnpj: number;
  email: string;
  name: string;
  password: string;
  birthDate: string | Date;
  isCompany?: boolean;
};

export interface CreateProvider {
  fantasyName?: string,
  service: Service;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  number: string;
  lat: string;
  lng: string;
  experiences: Experience[] | Prisma.JsonArray,
  formations: Formation[] | Prisma.JsonArray,
  socialNetworks: SocialNetwork[] | Prisma.JsonArray,
};
