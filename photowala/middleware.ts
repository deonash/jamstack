import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for data requests and static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.json')
  ) {
    return NextResponse.next();
  }

  const isLoggedIn = request.cookies.get('auth_token');
  const path = request.nextUrl.pathname;

  // Allow access to login page when not logged in
  if (path === '/login' && !isLoggedIn) {
    return NextResponse.next();
  }

  // Redirect to appropriate page if already logged in
  if (path === '/login' && isLoggedIn) {
    const userRole = request.cookies.get('user_role')?.value;
    const redirectPath = userRole === 'studio' ? '/studio/upload' : '/guest/selfie';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Protect other routes
  if (!isLoggedIn && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  if (isLoggedIn && request.cookies.get('user_role')) {
    // Prevent studio users from accessing guest routes
    if (request.cookies.get('user_role')?.value === 'studio' && path.startsWith('/guest')) {
      return NextResponse.redirect(new URL('/studio/upload', request.url));
    }

    // Prevent guest users from accessing studio routes
    if (request.cookies.get('user_role')?.value === 'guest' && path.startsWith('/studio')) {
      return NextResponse.redirect(new URL('/guest/selfie', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 