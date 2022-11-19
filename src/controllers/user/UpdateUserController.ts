import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { UserToUpdate } from "../../repositories/UserRepository";
import { UpdateUserService } from "../../services/user/UpdateUserService";
import { Controller } from "../Controller";

@injectable()
export class UpdateUserController extends Controller {
  constructor(
    private service: UpdateUserService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let user = {
      id: req.user?.id,
      name: req.body["name"],
      email: req.body["email"],
      cellphone: req.body["cellphone"],
      cpfCnpj: +req.body["cpfCnpj"],
      birthDate: req.body["birthDate"],
      isCompany: req.body["isCompany"],
      provider: req.body["provider"],
    };

    for (const key in user) {
      if(typeof user[key as keyof typeof user] === "undefined"){
        delete user[key as keyof typeof user];
      }
    }

    if(user.provider) {
      user.provider = {
        update: {
          ...user.provider
        }
      };

      delete user.provider.update.userId;
    }

    const userUpdated = await this.service.execute(user as UserToUpdate);
    
    res.status(200).json({
      data: {
        user: userUpdated
      }
    });
  }
}