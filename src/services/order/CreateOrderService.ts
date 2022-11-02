import { injectable } from "tsyringe";
import { OrderRepository, OrderToCreate } from "../../repositories/OrderRepository";

@injectable()
export class CreateOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(order: OrderToCreate) {
    
    order.status = "OPENED";

    return this.orderRepository.create(order);
  }
}
