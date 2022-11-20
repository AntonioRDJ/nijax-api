import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";

@injectable()
export class DeleteUserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(id: string) {
    return this.userRepository.delete(id)
  }
}
