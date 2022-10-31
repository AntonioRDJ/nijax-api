import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { LoginService } from "../services/auth/LoginService";
import { Controller } from "./Controller"

@injectable()
export class LoginController extends Controller {
  constructor(
    private loginService: LoginService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    const {
      email,
      password,
    } = req.body;

    const { accessToken, ...user} = await this.loginService.execute(email, password);

    res.status(200).json({
      message: "Login successfully",
      data: {
        token: accessToken
      }
    })
  }
}