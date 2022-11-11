import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";

@injectable()
export class CandidacyOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute({orderId, userId}: { orderId: string, userId: string }) {

    return this.orderRepository.update({
      id: orderId,
      candidacy: {
        create: {
          provider: {
            connect: {
              userId,
            }
          }
        }
      }
    });
  }
}
