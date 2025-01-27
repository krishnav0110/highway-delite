import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";





const protectedRoutes: RegExp[] = [
  /^\/$/,
  /^\/api\/notes\/.+$/,
];



export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(route => route.test(pathname));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }



  const token = (await cookies()).get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }



  const res = await fetch(`${process.env.URL}/api/auth/session`, {
    method: "POST",
    headers: {
      "x-access-token": token
    }
  });

  if (res.status !== 200) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}





export const config = {
  matcher: [
    // "/:",
    // "/api/:notes*"
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};