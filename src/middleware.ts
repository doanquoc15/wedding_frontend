import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/tai-khoan",];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.name;

  // Check if the user is logged in
  if (role) {
    // Check admin routes for admin role
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      role === "ADMIN" &&
      (!pathname.startsWith("/admin") || pathname === "/admin")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Allow access to non-admin routes and admin routes for admin users
    return NextResponse.next();
  } else {
    // Redirect to signin for protected routes when the user is not logged in
    if (protectedRoutes.includes(pathname) || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dang-nhap", request.url));
    }

    // Allow access to public routes when the user is not logged in
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};