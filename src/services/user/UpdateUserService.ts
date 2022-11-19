import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { UserRepository, UserToUpdate } from "../../repositories/UserRepository";
import { FindUserByIdService } from "./FindUserByIdService";

@injectable()
export class UpdateUserService {
  constructor(
    private userRepository: UserRepository,
    private findUserByIdService : FindUserByIdService
  ) {}

  async execute(user: UserToUpdate) {
    const foundUser = await this.findUserByIdService.execute(user.id);

    if(!foundUser){
      throw new createHttpError.NotFound("User Not Found");
    }

    return this.userRepository.update(user);
  }
}
