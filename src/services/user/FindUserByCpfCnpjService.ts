import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class FindUserByCpfCnpjService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(cpfCnpj: number) {
    
    const found = await this.userRepository.findByCpfCnpj(cpfCnpj);

    if(!found){
      throw new createHttpError.NotFound("User Not Found");
    }

    return found;
  }
}
