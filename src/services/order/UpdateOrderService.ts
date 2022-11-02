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

  async execute(order: OrderToUpdate) {
    const foundOrder = await this.findOrderService.execute(order.id);

    if(!foundOrder){
      throw new createHttpError.NotFound("Order Not Found");
    }

    return this.orderRepository.update(order);
  }
}
