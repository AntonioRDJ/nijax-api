import { Prisma, Status } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";
import { Service } from "../utils/constants";

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
      },
      include: {
        service: true,
      }
    })
  }

  list(data: ListOrderParams) {
    return this.orderRepository.findMany({
      skip: data.offset,
      take: data.limit,
      where : {
        deletedAt : null,
        userId: {
          equals: !data.forProvider ? data.userId : undefined,
          not: data.forProvider ? data.userId : undefined,
        },
        service: {
          name: data.service,
        }
      },
      include: {
        service: true,
      }
    })
  }

  find(id: string) {
    return this.orderRepository.findFirst({
      where: {
        id: id,
        deletedAt : null,
      },
      include: {
        service: true,
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
      include: {
        service: true,
      }
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

export interface ListOrderParams {
  limit: number;
  offset: number;
  userId?: string;
  service?: Service;
  forProvider?: boolean;
}
