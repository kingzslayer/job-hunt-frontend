import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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
  let onboardingCompleted: boolean | null = null;
  if (user) {
    const { data: profile } = await supabasessr
      .from('users')
      .select('onboarding_completed')
      .eq('user_id', user.id)
      .maybeSingle();

    onboardingCompleted = profile?.onboarding_completed ?? null;
  }

  if (pathname.startsWith('/auth/') && user) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (isProtectedRoute && user && onboardingCompleted === false) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if (pathname === '/onboarding' && user && onboardingCompleted === true) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}
