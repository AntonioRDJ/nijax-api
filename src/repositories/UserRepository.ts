import { Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";

@injectable()
export class UserRepository {
  private userRepository: Prisma.UserDelegate<undefined>;

  constructor() {
    this.userRepository = prisma.user;
  }

  findByEmail(email: string) {
    return this.userRepository.findUnique({
      where: {
        email
      },
      include: {
        provider: true,
      }
    });
  }

  findAll() {
    return this.userRepository.findMany({
      include: {
        provider: true,
      }
    });
  }

  create(user: Prisma.UserCreateInput) {
    return this.userRepository.create({
      data: user,
      include: {
        provider: true,
      }
    })
  }
};
