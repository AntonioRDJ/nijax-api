import { Prisma, Service, User } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";

@injectable()
export class RequestRepository {
  private requestRepository: Prisma.OrderDelegate<undefined>;

  constructor() {
    this.requestRepository = prisma.order;
  }

  create(input: any) {
    return this.requestRepository.create({
      data: input
    })
  }
};
