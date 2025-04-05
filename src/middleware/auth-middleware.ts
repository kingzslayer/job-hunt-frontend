import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/' || pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;
  if (token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}
