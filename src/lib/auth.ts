import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function checkAuthStatus() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return false;
    }

    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
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
