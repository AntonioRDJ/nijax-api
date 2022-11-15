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

    const { lat, lng, distance, service, userId } = order;
    
    const providers = await this.providerRepository.getNearby(lat, lng, distance, service, userId);
    
    if(!providers || !providers.length){
      return
    }

    const promises: Promise<any>[] = [];
    providers.forEach(provider => {
      if(provider.cellphone) {
        promises.push(
          twilioClient.messages.create({
            from: Config.TWILIO.PHONE,
            body: `
              Novo pedido disponível para se candidatar! Acesso o aplicativo e candidate-se. Título do pedido: ${order.title}
            `,
            to: `whatsapp:+55${provider.cellphone}`
          })
        );
      }
    });

    await Promise.all(promises);

    return providers;
  }
}
