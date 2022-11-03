import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class FindUserByEmailService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(email: string) {
    
    const found = await this.userRepository.findByEmail(email);

    if(!found){
      throw new createHttpError.NotFound("User Not Found");
    }

    return found;
  }
}
