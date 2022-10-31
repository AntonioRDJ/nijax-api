import { Prisma, Status } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";

@injectable()
export class OrderRepository {
  private orderRepository: Prisma.OrderDelegate<undefined>;

  constructor() {
    this.orderRepository = prisma.order;
  }

  create(order: OrderToCreate) {
    const {userId, service, ...rest} = order;
    return this.orderRepository.create({
      data: {
        ...rest,
        service: {
          connect: {
            name: service,
          }
        },
        user: {
          connect: {
            id: userId,
          }
        }
      }
    })
  }

  list(data: any) {
    return this.orderRepository.findMany({
      skip: data.offset,
      take: data.limit,
      where : {
        deletedAt : null,
      }
    })
  }

  find(id: string) {
    return this.orderRepository.findFirst({
      where: {
        id: id,
        deletedAt : null,
      }
    })
  }

  update(order: OrderToUpdate) {
    const { userId, id, service, ...rest } = order;    
    return this.orderRepository.update({
      data: {
        ...rest,
        service: {
          connect: {
            name: service,
          }
        }
      },
      where: {
        id,
      },
    })
  }

  delete(id: string) {
    return this.orderRepository.update({
      data: {
        deletedAt : new Date()
      },
      where : {
        id: id,
      }
    })
  }
};

export interface OrderToCreate {
  title: string;
  address: string;
  description: string;
  status: Status;
  userId: string;
  service: string;
};

export interface OrderToUpdate {
  id: string;
  title: string;
  address: string;
  description: string;
  status: Status;
  userId: string;
  service: string;
};
