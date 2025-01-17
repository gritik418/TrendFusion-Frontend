import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_TF_TOKEN, TF_TOKEN } from "./constants/variables";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/admin/login");

  const isAdminPath =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/admin/orders") ||
    pathname.startsWith("/admin/products") ||
    pathname.startsWith("/admin/customers");

  const cookie = request.cookies.get(TF_TOKEN)?.value;
  const isAdmin = request.cookies.get(ADMIN_TF_TOKEN)?.value;

  if (pathname.startsWith("/admin/login") && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isPublicPath && cookie && !pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !cookie && !isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/checkout/:path*",
    "/order_details/:path*",
    "/login/:path*",
    "/signup/:path*",
    "/admin/:path*",
  ],
};
