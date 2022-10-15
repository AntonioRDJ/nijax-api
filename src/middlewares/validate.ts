import { NextFunction, Request, Response } from "express";

export function validate() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {

  };
}