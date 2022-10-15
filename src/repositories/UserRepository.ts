import { Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";

@injectable()
export class UserRepository {
  private userRepository: Prisma.UserDelegate<undefined>;

  constructor() {
    this.userRepository = prisma.user;
  }

  findAll() {
    return this.userRepository.findMany({
      include: {
        provider: true,
      }
    });
  }

  create(input: Prisma.UserCreateInput) {
    return this.userRepository.create({
      data: input,
    })
  }
};
