import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";

@injectable()
export class DeleteOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(id: string, userId: string) {
    const found = await this.orderRepository.find(id, userId);

    if(!found){
      throw new createHttpError.NotFound("Order Not Found");
    }
    
    return this.orderRepository.delete(id)
  }
}
