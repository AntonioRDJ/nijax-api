import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const {
    isCompany,
    name,
    email,
    cellphone,
    cpfCnpj,
    password,
    confirmPassword,
    fantasyName,
    address,
    service,
    experiences,
    formations,
    socialNetworks,
  } = req.body;


};