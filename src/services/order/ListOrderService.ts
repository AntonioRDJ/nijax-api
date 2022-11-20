import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Service } from "../../utils/constants";

interface Payload {
  limit: number;
  offset: number;
  userId: string;
  service?: Service;
  forProvider?: boolean;
  onlyCandidate?: boolean;
}

@injectable()
export class ListOrderService {
  constructor(
    private repository: OrderRepository,
  ) {}

  async execute(payload: Payload) {
    const orders = await this.repository.list(payload);
    orders.forEach((order) => {
      order.distance = order.distance / 1000;
    });
    return orders;
  }
}
