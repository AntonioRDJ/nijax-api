import { UserWithoutPassword } from "../index";
import { Request } from "express";

export interface Request extends Request {
  user?: UserWithoutPassword;
}
