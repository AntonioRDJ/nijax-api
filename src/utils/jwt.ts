import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET ?? "";

export function signAccessToken(payload: any) {
  const token = jwt.sign(payload, tokenSecret, {
    algorithm: "HS512",
    expiresIn: "7d"
  });
  return token;
};

export function verifyAccessToken(token: string) {
  const decoded = jwt.verify(token, tokenSecret);
  return decoded;
};
