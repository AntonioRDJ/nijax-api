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

  list(data: any) {
    return this.requestRepository.findMany({
      skip: data.offset,
      take: data.limit,
      where : {
        deletedAt : null
      }
    })
  }

  find(id: number) {
    return this.requestRepository.findFirst({
      where  : {
        id : id,
        deletedAt : null
      }
    })
  }

  update(request : any) {
    return this.requestRepository.update({
      data: request,
      where : {
        id : request.id
      }
    })
  }

  delete(id:number) {
    return this.requestRepository.update({
      data: {
        deletedAt : new Date()
      },
      where : {
        id
      }
    })
  }
};
