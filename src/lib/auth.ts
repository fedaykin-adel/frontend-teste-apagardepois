import { jwtVerify } from "jose";

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";
const encoder = new TextEncoder();

export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, encoder.encode(SECRET));
  return payload as {
    sub: string;
    email: string;
    name: string;
    iat: number;
    exp: number;
  };
}
