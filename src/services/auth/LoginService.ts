import { injectable } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import createError from "http-errors";
import { validationHash } from "../../utils/bcrypt";
import { signAccessToken } from "../../utils/jwt";
@injectable()
export class LoginService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new createError.NotFound("User not registred");
    }

    const checkPassword = await validationHash(password, user.password);
    if(!checkPassword) {
      throw new createError.Unauthorized('Email address or password not valid');
    }

    const {password: rPassword , ...userWithoutPassword} = user;
    const accessToken = signAccessToken({ ...userWithoutPassword, password : undefined});
    return {...userWithoutPassword, accessToken}
  }
}
