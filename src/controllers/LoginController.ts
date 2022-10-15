import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { LoginService } from "../services/LoginService";
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

    const accessToken = await this.loginService.execute(email, password);

    res.status(200).json({
      message: "Login successfully",
      data: accessToken
    })
  }
}