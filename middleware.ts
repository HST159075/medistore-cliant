// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // লোকাল (HTTP) এবং প্রোডাকশন (HTTPS) উভয় কুকি চেক নিশ্চিত করা
  const sessionToken = 
    request.cookies.get("better-auth.session_token")?.value || 
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isProtectedPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/seller-dashboard") ||
    pathname === "/checkout";

  const isAuthPage = pathname === "/login" || pathname === "/Register";

  // ১. যদি লগইন না থাকে এবং প্রোটেক্টেড পেজে যাওয়ার চেষ্টা করে
  if (isProtectedPage && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    // ইউজার যে পেজে যেতে চেয়েছিল সেটি মনে রাখার জন্য (ঐচ্ছিক)
    // loginUrl.searchParams.set("callbackUrl", pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // ২. যদি লগইন থাকে এবং পুনরায় লগইন/রেজিস্টার পেজে যেতে চায়
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
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
    "/Register", 
  ],
};