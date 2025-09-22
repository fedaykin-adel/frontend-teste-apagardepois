import "server-only";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth"; // ou auth.edge se vc estiver 100% no edge

export async function getServerUser() {
  const cookieStore = await cookies(); // <-- AGORA É ASSÍNCRONO
  const token = cookieStore.get("auth")?.value; // pega o cookie httpOnly
  if (!token) return null;

  try {
    const payload = await verifyJWT(token); // { sub, email, name, iat, exp }
    return {
      id: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
    };
  } catch {
    return null;
  }
}
