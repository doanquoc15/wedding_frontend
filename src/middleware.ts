import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathName = request.nextUrl.pathname;
  const roleName = request.cookies.get("role")?.name;
  // if (roleName) {
  //   if (pathName.startsWith("/admin") && roleName !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/dang-nhap", request.url));
  //   } else {
  //     return NextResponse.redirect(new URL("/admin", request.url));
  //   }
  //
  // } else {
  //   if (pathName.startsWith("/tai-khoan")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
}
