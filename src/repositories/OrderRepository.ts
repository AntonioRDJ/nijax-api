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
    const {userId, ...rest} = order;
    return this.orderRepository.create({
      data: {
        ...rest,
        lat: parseFloat(rest.lat),
        lng: parseFloat(rest.lng),
        user: {
          connect: {
            id: userId,
          }
        }
      },
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
          equals: data.service,
        },
        candidacy: data.onlyCandidate ? {
          some: {
            provider: {
              userId: data.userId
            }
          }
        } : {
          none: {
            provider: {
              userId: data.userId
            }
          }
        }
      }
    })
  }

  async listOrderByDistance({userId, service, limit, offset}: ListOrderByDistanceParams) {
    return await prisma.$queryRaw(
      Prisma.sql`
      SELECT o.*
      FROM "order" o
      LEFT JOIN candidacy c ON c.order_id = o.id
      LEFT JOIN provider p ON  p."userId" = ${userId}
      WHERE o."service" = ${service}::"Service"
      AND o.user_id != p."userId"
      AND (
        c.provider_id != p.id 
        OR c.provider_id is null
      )
      AND o.deleted_at is null
      AND earth_box(ll_to_earth(o.lat, o.lng), o.distance) @> ll_to_earth(p.lat, p.lng)
      AND earth_distance(ll_to_earth(o.lat, o.lng), ll_to_earth(p.lat, p.lng)) < o.distance
      OFFSET ${offset}
      LIMIT ${limit};`
    );
  }

  find(id: string, userId?: string) {
    return this.orderRepository.findFirst({
      where: {
        id: id,
        deletedAt : null,
        userId
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        candidacy: {
          select: {
            provider: {
              include: {
                user: true
              }
            }
          }
        },
      }
    })
  }

  update(order: OrderToUpdate) {
    const {id, ...rest} = order;
      
    return this.orderRepository.update({
      data: {
        ...rest,
      },
      where: {
        id
      },
      include: {
        candidacy: true,
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
  description: string;
  status: Status;
  userId: string;
  service: Service;
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
  number: string;
  lat: string;
  lng: string;
  distance: number;
};

export interface OrderToUpdate extends Prisma.OrderUpdateInput {
  id: string;
};

export interface ListOrderParams {
  limit: number;
  offset: number;
  userId?: string;
  service?: Service;
  forProvider?: boolean;
  onlyCandidate?: boolean;
}

export interface ListOrderByDistanceParams {
  limit: number;
  offset: number;
  userId?: string;
  service?: Service;
}