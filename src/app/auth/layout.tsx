import { withAuth } from '@/lib/auth';

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth('/auth/');
  return <>{children}</>;
}
