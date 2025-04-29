import { cn } from '@/lib/utils';
import { HelpCircle, LogOut, Menu, Search, Settings, User } from 'lucide-react';
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

  async function logout() {
    await supabase.auth.signOut();
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
