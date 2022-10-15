import { injectable } from "tsyringe";
import { UserRepository } from "../repositories/UserRepository";

@injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(createUser: CreateUser, createProvider: CreateProvider) {
    return await this.userRepository.create({
      ...createUser,
      provider: createUser.isCompany ? {
        create: {
          ...createProvider
        }
      } : undefined
    });
  }
}

interface CreateUser {
  cellphone: string;
  cpfCnpj: string;
  email: string;
  name: string;
  password: string;
  isCompany?: boolean;
};

interface CreateProvider {
  address: string,
  fantasyName: string,
  experiences: any,
  formations: any,
  socialNetworks: any,
};
