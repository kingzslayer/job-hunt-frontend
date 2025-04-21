import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAuthStatus() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    return token ? true : false;
  } catch {
    return false;
  }
}

export function isProtectedRoute(pathname: string): boolean {
  if (pathname === '/') return false;
  if (pathname.startsWith('/auth/')) return false;
  return true;
}

export async function withAuth(pathname: string) {
  if (isProtectedRoute(pathname)) {
    const isAuthenticated = await checkAuthStatus();

    if (!isAuthenticated) {
      redirect('/auth/login');
    }
  }
}
