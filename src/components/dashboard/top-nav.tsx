import { cn } from '@/lib/utils';
import { Bell, Check, HelpCircle, LogOut, Menu, Search, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';

import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  showSidebarButton?: boolean;
  onSidebarOpen?: () => void;
}

export function TopNav({ className, showSidebarButton, onSidebarOpen, ...props }: TopNavProps) {
  const router = useRouter();
  // Dummy data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    initials: 'JD',
  };

  const notifications = [
    {
      id: 1,
      title: 'New application status',
      description: 'Your application to Google has been viewed',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Interview scheduled',
      description: 'Microsoft wants to interview you next week',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 3,
      title: 'Application deadline',
      description: 'Amazon application closes tomorrow',
      time: '1 day ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function logout() {
    await supabase().auth.signOut();
    router.push('/');
  }

  return (
    <div className={cn('bg-card flex h-16 items-center border-b px-4', className)} {...props}>
      {/* Mobile sidebar toggle button */}
      {showSidebarButton && onSidebarOpen && (
        <Button variant="ghost" size="icon" onClick={onSidebarOpen} className="mr-2 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      )}

      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden items-center md:flex">
          <Search className="text-muted-foreground absolute left-2.5 h-4 w-4" />
          <Input type="search" placeholder="Search jobs, companies..." className="w-[250px] pl-9" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                  <Check className="mr-1 h-3 w-3" />
                  Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      'flex cursor-pointer flex-col items-start p-3',
                      !notification.read && 'bg-muted/50',
                    )}
                  >
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-muted-foreground text-sm">{notification.description}</div>
                    <div className="text-muted-foreground mt-1 text-xs">{notification.time}</div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/notifications"
                    className="hover:bg-muted w-full cursor-pointer text-center"
                  >
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <div className="text-muted-foreground py-4 text-center">No notifications</div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="w-full cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="w-full cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/"
                onClick={logout}
                className="text-destructive focus:text-destructive w-full cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
