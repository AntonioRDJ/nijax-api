import { Response } from "express";
import { injectable } from "tsyringe";
import { Request } from "../../@types/express";
import { GetAddressByLocationService } from "../../services/location/GetAddressByLocationService";
import { Controller } from "../Controller"

@injectable()
export class FindAddressByLocationController extends Controller {
  constructor(
    private service: GetAddressByLocationService,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {

    const keys = [
      "lat",
      "lng",
    ];
    
    for (const key of keys) {
      if(!req.query[key]){
        res.status(400).json({
          data: {
            error: `Invalid field '${key}'`
          }
        });
      }
    }
    
    let {
      lat,
      lng,
    } = req.query as any;
    const address = await this.service.execute({lat, lng});

    res.status(200).json({
      data: {
        address
      }
    });
  }
}