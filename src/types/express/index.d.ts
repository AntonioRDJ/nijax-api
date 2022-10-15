import { UserWithoutPassword } from "../index";

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: UserWithoutPassword;
    }
  }
}
