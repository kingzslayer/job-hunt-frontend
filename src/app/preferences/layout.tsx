import { withAuth } from '@/lib/auth';

export default async function PreferencesRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth('/preferences');
  return <>{children}</>;
}
