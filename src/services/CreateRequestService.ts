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
export class CreateRequestService {
  constructor(
    private requestRepository: RequestRepository,
  ) {}

  async execute(request : RequestSimple) {
    
    request.status = 'Em aberto';

    return this.requestRepository.create(request)


  }
}
