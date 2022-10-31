import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import { signAccessToken } from "../../utils/jwt";
import { generateHash } from "../../utils/bcrypt";
import createHttpError from "http-errors";

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
          ...createProvider
        }
      } : undefined
    });
    
    const accessToken = signAccessToken(user);
    const {password: rPassword , ...userWithoutPassword} = user;
    return {...userWithoutPassword, accessToken};
  }
}

interface CreateUser {
  cellphone: string;
  cpfCnpj: number;
  email: string;
  name: string;
  password: string;
  birthDate: string;
  isCompany?: boolean;
};

interface CreateProvider {
  address: string,
  fantasyName: string,
  experiences: any,
  formations: any,
  socialNetworks: any,
};
