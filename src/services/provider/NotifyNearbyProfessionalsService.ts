import { Order } from "@prisma/client";
import { injectable } from "tsyringe";
import { Config } from "../../config";
import { ProviderRepository } from "../../repositories/ProviderRepository";
import twilioClient from "../../twilio";

@injectable()
export class NotifyNearbyProfessionalsService {
  constructor(
    private providerRepository: ProviderRepository,
  ) {}

  async execute(order: Order) {

    const { lat, lng, distance: meters, service, userId } = order;

    const providers = await this.providerRepository.getNearby(lat, lng, (meters*1000), service, userId);
    
    if(!providers || !providers.length){
      return
    }

    const promises: Promise<any>[] = [];
    providers.forEach(provider => {
      if(provider.cellphone) {
        promises.push(
          twilioClient.messages.create({
            to: `+55${provider.cellphone}`,
            messagingServiceSid: Config.TWILIO.SERVICE_SID,
            body: `
              Novo pedido disponível para se candidatar! Acesso o aplicativo e candidate-se. Título do pedido: ${order.title}
            `,
          })
        );
      }
    });

    await Promise.all(promises);

    return providers;
  }
}
