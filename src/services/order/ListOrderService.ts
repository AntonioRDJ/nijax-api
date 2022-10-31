import { injectable } from "tsyringe";
import { OrderRepository } from "../../repositories/OrderRepository";

interface Payload {
  limit : number,
  offset : number
}

@injectable()
export class ListOrderService {
  constructor(
    private repository: OrderRepository,
  ) {}

  async execute(payload : Payload) {
    return this.repository.list(payload)
  }
}
