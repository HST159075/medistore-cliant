import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__better-auth-session-token");

  const { pathname } = request.nextUrl;

  const isProtectedPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/seller-dashboard") ||
    pathname === "/checkout"; 

  const isLoginPage = pathname === "/login" || pathname === "/register";

  if (isProtectedPage && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
    "/checkout", 
    "/login",
    "/register",
  ],
};