import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getCookies } from 'next-client-cookies/server';


const publicRoutes = ["/admin", "/registartion",  "/confirmation", "/about", "/home"];

const authRequiredRoutes = [
  "/registrationList",
  "/scanqr",
];

export async function middleware(request: NextRequest) {
  // If the user is already signed in, then send the user to dashboard intsad of login page
     const token = request.cookies.get("token")?.value || "";
  const pathname = request.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    // Public routes are accessible to everyone, no redirect
    // Except redirect logged-in user away from /admin (login page)
    if (pathname === "/admin" && token) {
      return NextResponse.redirect(new URL("/registrationList", request.url));
    }
    return NextResponse.next();
  }

  // For all other routes (authRequiredRoutes), require token
  const isAuthRequired = authRequiredRoutes.some(route => pathname.startsWith(route));
  if (isAuthRequired && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }


  if (request.nextUrl.pathname === "/") {
    // Redirect unauthenticated users from root to login page
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();

  // return NextResponse.next()
}

export const config = {
  matcher: [

    "/registrationList/:path*", // Protect dashboard and subpages
    "/admin",
    "/registartion",
    "/scanqr",
    "/confirmation",
    "/about",
    "/home",
    "/", // Optional: protect homepage
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
