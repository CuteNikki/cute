import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sends anyone without a session cookie from /admin to the sign-in page. Only
 * a first pass: the admin pages and their actions check the session itself
 * (requireOwner).
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();
  return NextResponse.redirect(new URL('/sign-in', request.url));
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
