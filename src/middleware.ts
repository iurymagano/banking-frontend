import { NextRequest, NextResponse } from 'next/server';
import { handleGetUser } from './lib/server/auth';

export async function middleware(request: NextRequest) {
  const user = await handleGetUser();
  if (
    ((request.nextUrl.pathname.startsWith('/dashboard') && !user) ||
      request.nextUrl.pathname.startsWith('/statement')) &&
    !user
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (
    (request.nextUrl.pathname == '/' && user) ||
    (request.nextUrl.pathname == '/register' && user)
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: '/((?!.*\\..*|_next).*)',
};
