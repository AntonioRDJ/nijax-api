import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { OrderRepository, OrderToUpdate } from "../../repositories/OrderRepository";
import { FindOrderService } from "./FindOrderService";

@injectable()
export class UpdateOrderService {
  constructor(
    private orderRepository: OrderRepository,
    private findOrderService : FindOrderService
  ) {}

  async execute(order: OrderToUpdate, userId: string) {
    const foundOrder = await this.findOrderService.execute(order.id, userId);

    if(!foundOrder){
      throw new createHttpError.NotFound("Order Not Found");
    }
    const orderUpdated = await this.orderRepository.update(order);
    orderUpdated.distance = orderUpdated.distance / 1000;
    return orderUpdated;
  }
}
