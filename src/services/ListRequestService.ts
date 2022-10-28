import { injectable } from "tsyringe";
import { RequestRepository } from "../repositories/RequestRepository";

interface Payload {
  limit : number,
  offset : number
}

@injectable()
export class ListRequestService {
  constructor(
    private repository: RequestRepository,
  ) {}

  async execute(payload : Payload) {
    return this.repository.list(payload)
  }
}
