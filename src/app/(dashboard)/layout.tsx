import { DashboardLayout } from '@/components/dashboard/layout';
import { withAuth } from '@/lib/auth';

export default async function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth('/dashboard');
  return <DashboardLayout>{children}</DashboardLayout>;
}
