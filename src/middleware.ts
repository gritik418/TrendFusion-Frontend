import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TF_TOKEN } from "./constants/variables";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  const cookie = request.cookies.get(TF_TOKEN)?.value;

  if (isPublicPath && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login/:path*", "/signup/:path*"],
};
