import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/tai-khoan", "/payment/success", "/payment/cancel"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  if (role) {
    if (pathname === "/dang-nhap" || pathname === "/dang-ky") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (role === "CUSTOMER") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      role === "ADMIN" &&
      (!pathname.startsWith("/admin") || pathname === "/admin")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  } else {
    if (protectedRoutes.includes(pathname) || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dang-nhap", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)",
    "/partner/:path*",],
};