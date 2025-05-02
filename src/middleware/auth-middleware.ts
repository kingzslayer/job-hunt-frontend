import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function authMiddleware(request: NextRequest) {
  const cookieStore = await cookies();
  const pathname = request.nextUrl.pathname;

  const isOnboardingCompleted = cookieStore.get('onbording_completed')?.value;

  const protectedRoutes = ['/home', '/analytics', '/help', '/settings', '/jobs', '/profile'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route);

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabasessr = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
      auth: { storageKey: 'auth-token' },
    },
  );

  const user = (await supabasessr.auth.getUser()).data.user;

  if (pathname.startsWith('/auth/') && user) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (isProtectedRoute && user && isOnboardingCompleted === 'false') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if (pathname === '/onboarding' && user && isOnboardingCompleted === 'true') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}
