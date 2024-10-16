import { NextRequest, NextResponse } from 'next/server';
import { handleGetUser } from './lib/server/auth';

export async function middleware(request: NextRequest) {
  const user = await handleGetUser();
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith('/dashboard');
  const isStatement = pathname.startsWith('/statement');
  const isAccount = pathname.startsWith('/account');

  const login = new URL('/', request.url);
  const dashboardUrl = new URL('/dashboard', request.url);
  const accountUrl = new URL('/account', request.url);

  if (!user) {
    if (isDashboard || isStatement || isAccount) {
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  const isAdmin = user.email === 'adm@email.com';

  if (isAdmin) {
    if (isDashboard || isStatement) {
      return NextResponse.next();
    }
    return NextResponse.redirect(dashboardUrl);
  }

  if (!isAccount && (isDashboard || isStatement)) {
    return NextResponse.redirect(accountUrl);
  }

  if ((pathname === '/' || pathname === '/register') && user) {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// import { NextRequest, NextResponse } from 'next/server';
// import { handleGetUser } from './lib/server/auth';

// export async function middleware(request: NextRequest) {
//   const user = await handleGetUser();
//   if (
//     ((request.nextUrl.pathname.startsWith('/dashboard') && !user) ||
//       request.nextUrl.pathname.startsWith('/statement')) &&
//     !user
//   ) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
//   if (
//     (request.nextUrl.pathname == '/' && user) ||
//     (request.nextUrl.pathname == '/register' && user)
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }
// }

export const config = {
  matcher: '/((?!.*\\..*|_next).*)',
};
