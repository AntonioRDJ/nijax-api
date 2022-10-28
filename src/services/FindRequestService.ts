import createHttpError from "http-errors";
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
export class FindRequestService {
  constructor(
    private requestRepository: RequestRepository,
  ) {}

  async execute(id : number) {
    
    const found = await this.requestRepository.find(id)

    if(!found){
      throw new createHttpError.NotFound("Request Not Found");
    }

    return found;

  }
}
