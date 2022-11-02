import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import { signAccessToken } from "../../utils/jwt";
import { generateHash } from "../../utils/bcrypt";
import createHttpError from "http-errors";
import { Service } from "../../utils/constants";
import { Experience, Formation, SocialNetwork } from "../../types/provider";

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
    createProvider.experiences = createProvider.experiences;
    let user = await this.userRepository.create({
      ...createUser,
      provider: createUser.isCompany ? {
        create: {
          fantasyName: createProvider.fantasyName ?? "",
          address: createProvider.address,
          experiences: JSON.stringify(createProvider.experiences),
          formations: JSON.stringify(createProvider.formations),
          socialNetworks: JSON.stringify(createProvider.socialNetworks),
          providerService: {
            create: {
              service: {
                connect: {
                  name: createProvider.service
                }
              }
            }
          },
        },
      } : undefined,
    });
    
    const accessToken = signAccessToken(user);
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
  address: string,
  experiences: Experience[],
  formations: Formation[],
  socialNetworks: SocialNetwork[],
  service: Service;
};
