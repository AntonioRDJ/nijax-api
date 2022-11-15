import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { GetLocationService } from "../../services/location/GetLocationService";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { NotifyNearbyProfessionalsService } from "../../services/provider/NotifyNearbyProfessionalsService";
import { Controller } from "../Controller"

@injectable()
export class CreateOrderController extends Controller {
  constructor(
    private createOrderService: CreateOrderService,
    private getLocationService: GetLocationService,
    private notifyNearbyProfessionalsService: NotifyNearbyProfessionalsService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let keys = [
      'title',
      'description',
      'service',
      'cep',
      'street',
      'district',
      'city',
      'state',
      'number',
      'distance',
    ];

    for (const key of keys) {
      if(!req.body[key]){
        res.status(400).json({
          data: {
            error: `Invalid field '${key}'`
          }
        });
      }
    }

    req.body.userId = req.user?.id;

    const {
      cep,
      street,
      district,
      city,
      state,
      number,
    } = req.body;

    const location = await this.getLocationService.execute({
      cep,
      street,
      district,
      city,
      state,
      number,
    });

    req.body.lat = location.lat;
    req.body.lng = location.lng;

    const order = await this.createOrderService.execute(req.body);
    this.notifyNearbyProfessionalsService.execute(order);

    res.status(200).json({
      data: {
        order
      }
    });
  }
}