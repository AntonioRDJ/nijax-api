import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";

@injectable()
export class DeleteOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(id: string) {
    return this.orderRepository.delete(id)
  }
}
