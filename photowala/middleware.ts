import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth_token');
  const userRole = request.cookies.get('user_role');

  // Public paths that don't require authentication
  if (path === '/login') {
    if (token) {
      // If already logged in, redirect to appropriate dashboard
      return NextResponse.redirect(new URL(
        userRole?.value === 'studio' ? '/studio/upload' : 
        userRole?.value === 'admin' ? '/admin/dashboard' : 
        '/guest/selfie',
        request.url
      ));
    }
    return NextResponse.next();
  }

  // Protected paths - check for authentication
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based protection
  if (path.startsWith('/studio') && userRole?.value !== 'studio') {
    return NextResponse.redirect(new URL('/guest/selfie', request.url));
  }

  if (path.startsWith('/guest') && userRole?.value !== 'guest') {
    return NextResponse.redirect(new URL('/studio/upload', request.url));
  }

  if (path.startsWith('/admin') && userRole?.value !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/studio/:path*',
    '/guest/:path*',
    '/admin/:path*',
    '/login'
  ]
};