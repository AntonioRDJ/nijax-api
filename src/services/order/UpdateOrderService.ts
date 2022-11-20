import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { OrderRepository, OrderToUpdate } from "../../repositories/OrderRepository";

@injectable()
export class UpdateOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(order: OrderToUpdate, userId: string) {
    const foundOrder = await this.orderRepository.find(order.id, userId);

    if(!foundOrder){
      throw new createHttpError.NotFound("Order Not Found");
    }
    const orderUpdated = await this.orderRepository.update(order);
    orderUpdated.distance = orderUpdated.distance / 1000;
    return orderUpdated;
  }
}
