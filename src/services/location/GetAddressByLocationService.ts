import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Config } from "../../config";
import { axiosInstance } from "../axios";

@injectable()
export class GetAddressByLocationService {
  constructor() {}

  async execute(location: Location) {
    const { lat, lng } = location;

    try {
      const location = await axiosInstance.get("geocode/json", {
        params: {
          latlng: `${lat},${lng}`,
          key: Config.MAPS_API_KEY,
        },
        baseURL: Config.MAPS_API_URL,
      });

      const results: any[] = location.data.results;

      const ceps: any[] = results
        .map((r) =>
          r.address_components.filter((adr: any) =>
            adr.types.includes("postal_code")
          )
        )
        .flat();

      return {
        cep: ceps[0].long_name as string,
      };
    } catch (error) {
      throw new createHttpError.BadRequest("Error finding location");
    }
  }
}

export type Location = {
  lat: number;
  lng: number;
};
