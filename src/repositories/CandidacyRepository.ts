import { Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../client";

@injectable()
export class CandidacyRepository {
  private candidacyRepository: Prisma.CandidacyDelegate<undefined>;

  constructor() {
    this.candidacyRepository = prisma.candidacy;
  }

  findOneByOrderId(orderId: string, userId: string) {
    return this.candidacyRepository.findFirst({
      where: {
        orderId,
        provider: {
          userId
        }
      },
    })
  }
};
