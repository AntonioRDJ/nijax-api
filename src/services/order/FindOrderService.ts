import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";

@injectable()
export class FindOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(id: string) {
    
    const found = await this.orderRepository.find(id)

    if(!found){
      throw new createHttpError.NotFound("Order Not Found");
    }

    return found;
  }
}
