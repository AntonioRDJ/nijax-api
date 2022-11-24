import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { CandidacyRepository } from "../../repositories/CandidacyRepository";
import { OrderRepository } from "../../repositories/OrderRepository";

@injectable()
export class RemoveCandidacyOrderService {
  constructor(
    private orderRepository: OrderRepository,
    private candidacyRepository: CandidacyRepository,
  ) {}

  async execute({orderId, userId}: { orderId: string, userId: string }) {

    const candidacy = await this.candidacyRepository.findOneByOrderId(orderId, userId);

    if(!candidacy) {
      throw new createHttpError.NotFound("Candidacy Not Found");
    }

    return this.orderRepository.update({
      id: orderId,
      candidacy: {
        delete: {
          id: candidacy?.id
        }
      }
    });
  }
}
