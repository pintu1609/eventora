import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getCookies } from 'next-client-cookies/server';

export async function middleware(request: NextRequest) {


  // If the user is already signed in, then send the user to dashboard intsad of login page
  if (request.nextUrl.pathname === "/") {
    
      // Redirect unauthenticated users from root to login page
      return NextResponse.redirect(new URL("/home", request.url));
  }
  

  return NextResponse.next();

  // return NextResponse.next()
}


export const config = {
  matcher: [
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

