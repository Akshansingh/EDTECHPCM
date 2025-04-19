import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedPaths = ["/profile", "/my-courses", "/settings"]
  const isProtectedPath = protectedPaths.some((route) => path.startsWith(route))

  // Check for session cookie
  const sessionCookie =
    request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token")

  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/my-courses/:path*", "/settings/:path*"],
}
