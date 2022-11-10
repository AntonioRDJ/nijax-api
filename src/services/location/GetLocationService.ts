import createHttpError from "http-errors";
import { injectable } from "tsyringe";
import { Config } from "../../config";
import { axiosInstance } from "../axios";

@injectable()
export class GetLocationService {
  constructor() {}

  async execute(address: Address) {
    const {
      cep,
      city,
      district,
      number,
      state,
      street,
    } = address;
    
    const addressFormated = `${street}, ${number} - ${district}, ${city} - ${state}, ${cep}, Brazil`;
    try {
      const location = await axiosInstance.get("geocode/json", {
        params: {
          address: addressFormated,
          key: Config.MAPS_API_KEY,
        },
        baseURL: Config.MAPS_API_URL,
      });
      const lat = location.data.results[0].geometry.location.lat;
      const lng = location.data.results[0].geometry.location.lng;

      return {lat, lng};
    } catch (error) {
      throw new createHttpError.BadRequest("Error finding location");
    }
  }
}

type Address = {
  cep: string,
  street: string,
  district: string,
  city: string,
  state: string,
  number: string,
}
