import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { RequestRepository } from "../repositories/RequestRepository";
import { FindRequestService } from "./FindRequestService";

@injectable()
export class UpdateRequestService {
  constructor(
    private requestRepository: RequestRepository,
    private findRequestService : FindRequestService
  ) {}

  async execute(request : any) {
    

    const foundRequest = await this.findRequestService.execute(request.id);

    if(!foundRequest){
      throw new createHttpError.NotFound("Request Not Found");
    }

    return this.requestRepository.update(request)

  }
}
