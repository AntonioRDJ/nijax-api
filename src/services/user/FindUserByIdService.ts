import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class FindUserByIdService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(id: string) {
    
    const found = await this.userRepository.findById(id);

    if(!found){
      throw new createHttpError.NotFound("User Not Found");
    }

    return found;
  }
}
