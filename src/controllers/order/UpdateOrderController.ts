import { Response } from "express";
import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { GetLocationService } from "../../services/location/GetLocationService";
import { UpdateOrderService } from "../../services/order/UpdateOrderService";
import { Controller } from "../Controller";

@injectable()
export class UpdateOrderController extends Controller {
  constructor(
    private service: UpdateOrderService,
    private getLocationService: GetLocationService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    let order: any = {
      id: req.params.orderId,
      status: req.body["status"],
      title: req.body["title"],
      description: req.body["description"],
      service: req.body["service"],
      cep: req.body["cep"],
      number: req.body["number"],
      street: req.body["street"],
      district: req.body["district"],
      city: req.body["city"],
      state: req.body["state"],
      distance: +req.body["distance"],
    };

    for (const key in order) {
      if(typeof order[key as keyof typeof order] === "undefined"){
        delete order[key as keyof typeof order];
      }
    }

    const userId = req.user?.id;

    if(!userId) {
      throw new createHttpError.BadRequest("Invalid User");
    }

    if(!req.body.id) {
      throw new createHttpError.BadRequest("Invalid Order Id");
    }

    const address = {
      cep: order.cep,
      street: order.street,
      district: order.district,
      city: order.city,
      state: order.state,
      number: order.number,
    }
    if(Object.values(address).every(v => !!v)) {
      const location = await this.getLocationService.execute(address);
      order.lat = location.lat;
      order.lng = location.lng;        
    }

    const orderUpdated = await this.service.execute(order, userId);
    
    res.status(200).json({
      data: {
        order: orderUpdated
      }
    });
  }
}