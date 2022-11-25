import { Order } from "@prisma/client";
import { injectable } from "tsyringe";
import { Config } from "../../config";
import { UserRepository } from "../../repositories/UserRepository";
import twilioClient from "../../twilio";

@injectable()
export class NotifyUserOrderService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(order: Order, candidacyUserId: string) {

    const { userId } = order;

    const [owner, candidacy] = await Promise.all([this.userRepository.findById(userId), this.userRepository.findById(candidacyUserId)]);
    
    if(!owner){
      return
    }

    if(owner.cellphone) {
      await twilioClient.messages.create({
        to: `+55${owner.cellphone}`,
        messagingServiceSid: Config.TWILIO.SERVICE_SID,
        body: `
          Novo canditado: "${candidacy?.provider?.fantasyName || candidacy?.name}", ao seu pedido "${order.title}"
        `,
      });
    }
  }
}
