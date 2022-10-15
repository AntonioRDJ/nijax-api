import {  NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  nest: NextFunction,
): void {
  const status = "error";
  let code = 500;
  let message = "Internal Server Error";

  res.send()
};
