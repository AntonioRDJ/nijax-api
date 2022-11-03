import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class FindUserByCellphoneService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(cellphone: string) {
    
    const found = await this.userRepository.findByCellphone(cellphone);

    if(!found){
      throw new createHttpError.NotFound("User Not Found");
    }

    return found;
  }
}
