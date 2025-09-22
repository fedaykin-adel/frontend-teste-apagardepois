import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// rotas que exigem login
const PROTECTED = ["/store/checkout"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    // em Next 15, req.cookies é síncrono aqui
    const hasAuth = req.cookies.get("auth")?.value;
    if (!hasAuth) {
      const url = req.nextUrl.clone();
      url.pathname = "/store/auth/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/store/checkout"] };
