import { injectable } from "tsyringe";
import { RequestRepository } from "../repositories/RequestRepository";

interface RequestSimple {
  title : string,
  address : string,
  description : string,
  status : string,
  serviceId ?: string ,
  userId ?: string 

}

@injectable()
export class DeleteRequestService {
  constructor(
    private requestRepository: RequestRepository,
  ) {}

  async execute(id : number) {
    return this.requestRepository.delete(id)
  }
}
