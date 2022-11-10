import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const env = dotenv.config();
dotenvExpand.expand(env);

const PORT = process.env.PORT ?? "8080";

export const Config = {
  PORT,
  API_URL: process.env.API_URL ?? `http://localhost:${PORT}`,
  MAPS_API_URL: process.env.MAPS_API_URL ?? "",
  MAPS_API_KEY: process.env.MAPS_API_KEY ?? "",
  TOKEN_SECRET: process.env.TOKEN_SECRET ?? "",
};
