import jwt, { JwtPayload } from "jsonwebtoken";

const TOKEN_EXPIRY = "4h";

export function generateToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}

export function verify(token: string): JwtPayload | string {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
