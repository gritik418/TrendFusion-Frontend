import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TF_TOKEN } from "./constants/variables";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isPublicPath = request.nextUrl.pathname.startsWith("/login");

  const cookie = request.cookies.get(TF_TOKEN)?.value;

  if (isPublicPath && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login/:path*", "/about/:path*"],
};
