import jwt from "jsonwebtoken";
import { Config } from "../config";

export function signAccessToken(payload: any) {
  const token = jwt.sign(payload, Config.TOKEN_SECRET, {
    algorithm: "HS512",
    expiresIn: "7d"
  });
  return token;
};

export function verifyAccessToken(token: string) {
  const decoded = jwt.verify(token, Config.TOKEN_SECRET);
  return decoded;
};
