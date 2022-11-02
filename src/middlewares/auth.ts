import { NextFunction, Response } from "express";
import createError from "http-errors";
import { UserWithoutPassword } from "../@types/index";
import { verifyAccessToken } from "../utils/jwt";
import { Request } from "../@types/express";

export default async function auth(req: Request, res: Response, next: NextFunction) {
  if(!req.headers.authorization) {
    return next(new createError.Unauthorized("Authorization is required"));
  }

  const token = req.headers.authorization.split(' ')[1];
  if(!token) {
    return next(new createError.Unauthorized());
  }
  
  try {
    const user = verifyAccessToken(token);
    req.user = user as UserWithoutPassword;
    next();
  } catch (error) {
    next(new createError.Unauthorized())
  }
}
