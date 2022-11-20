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

    const orderCreated = await this.orderRepository.create(order);
    orderCreated.distance = orderCreated.distance / 1000;
    return orderCreated;
  }
}

function kmToMetters(meters: number) {
  return meters * 1000;
}
