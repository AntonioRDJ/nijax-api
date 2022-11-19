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

  findByCellphone(cellphone: string) {
    return this.userRepository.findUnique({
      where: {
        cellphone
      }
    });
  }

  findByCpfCnpj(cpfCnpj: number) {
    return this.userRepository.findUnique({
      where: {
        cpfCnpj
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

  findById(id: string) {
    return this.userRepository.findUnique({
      where: {
        id
      },
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
      },
    })
  }

  update(user: UserToUpdate) {
    const {id, ...rest} = user;
      
    return this.userRepository.update({
      data: {
        ...rest,
      },
      where: {
        id,
      },
      include: {
        provider: true,
      }
    })
  }
};

export interface UserToUpdate extends Prisma.UserUpdateInput {
  id: string;
};

