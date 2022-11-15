import { Prisma, Service } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";

@injectable()
export class ProviderRepository {
  private providerRepository: Prisma.ProviderDelegate<undefined>;

  constructor() {
    this.providerRepository = prisma.provider;
  }

  async getNearby(lat: number, lng: number, distance: number, service: Service, userId: string): Promise<{
    cellphone: string
  }[]> {
    return await prisma.$queryRaw(
      Prisma.sql`
        SELECT cellphone from provider
        JOIN "user" u on u.id = provider."userId"
        WHERE provider."service" = ${service}::"Service"
        AND provider."userId" != ${userId}
        AND earth_box(ll_to_earth(${lat}, ${lng}), ${distance}) @> ll_to_earth(lat, lng)
        AND earth_distance(ll_to_earth(${lat}, ${lng}), ll_to_earth(lat, lng)) < ${distance}`
    );
  }
};
