import { injectable } from "tsyringe";
import { OrderRepository, OrderToCreate } from "../../repositories/OrderRepository";

@injectable()
export class CreateOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(order: OrderToCreate) {
    
    order.status = "OPENED";
    order.distance = kmToMetters(order.distance);

    return this.orderRepository.create(order);
  }
}

function kmToMetters(meters: number) {
  return meters * 1000;
}
