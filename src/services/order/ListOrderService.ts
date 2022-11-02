import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Service } from "../../utils/constants";

interface Payload {
  limit: number;
  offset: number;
  userId: string;
  service?: Service;
  forProvider?: boolean;
}

@injectable()
export class ListOrderService {
  constructor(
    private repository: OrderRepository,
  ) {}

  async execute(payload: Payload) {

    return this.repository.list(payload)
  }
}
