import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_TF_TOKEN, TF_TOKEN } from "./constants/variables";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  const isAdminPath = pathname.startsWith("/admin/dashboard");

  const cookie = request.cookies.get(TF_TOKEN)?.value;
  const isAdmin = request.cookies.get(ADMIN_TF_TOKEN)?.value;

  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isPublicPath && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login/:path*", "/signup/:path*", "/admin/dashboard/:path*"],
};
