import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { dashboardRoutes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Brain, CreditCard, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  defaultCollapsed?: boolean;
  onClose?: () => void;
}

export function SidebarNav({
  className,
  defaultCollapsed = false,
  onClose,
  ...props
}: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const pathname = usePathname();

  // Mock credit values - in a real app, these would come from an API or context
  const availableCredits = 125;
  const maxCredits = 500;
  const percentUsed = (availableCredits / maxCredits) * 100;

  return (
    <div
      className={cn(
        'bg-card flex h-screen flex-col border-r',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      {...props}
    >
      {/* Logo section */}
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <div className="text-primary">
            <Brain className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div className="ml-2 text-xl font-semibold">
              ApplyBrain <span className="text-primary">AI</span>
            </div>
          )}
        </div>

        {/* Close button for mobile - only shown when onClose is provided */}
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1 p-2">
        {dashboardRoutes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={onClose} // Close sidebar on navigation on mobile
              className={cn(
                'relative flex items-center rounded-md text-sm',
                isActive
                  ? 'bg-primary/10 text-primary py-2 pl-3 font-medium'
                  : 'text-muted-foreground hover:bg-muted/50 px-3 py-2',
                isActive &&
                  'before:bg-primary before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-sm',
                collapsed && 'justify-center px-0',
              )}
            >
              <route.icon
                className={cn(
                  'h-5 w-5',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                  !collapsed && 'mr-3',
                )}
              />
              {!collapsed && <span>{route.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Credits section at the bottom */}
      <div className="mt-auto p-4">
        {collapsed ? (
          <Button
            variant="ghost"
            onClick={() => setCollapsed(false)}
            className="flex w-full justify-center p-2"
          >
            <CreditCard className="text-primary h-5 w-5" />
          </Button>
        ) : (
          <Card className="bg-muted border-0 py-3 shadow-none">
            <CardContent className="space-y-3 p-0 px-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credits</span>
                <span className="text-muted-foreground text-xs">
                  {availableCredits} / {maxCredits}
                </span>
              </div>

              <Progress value={percentUsed} className="h-2" />

              <div className="text-muted-foreground mb-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span>AI Resume Reviews</span>
                  <span className="font-medium">50 credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Job Applications</span>
                  <span className="font-medium">10 credits</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-4 pb-0">
              <Button className="w-full">Buy Credits</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
