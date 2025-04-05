import {
  BarChart2,
  Briefcase,
  HelpCircle,
  Home,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react';

export interface Route {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
}

export const dashboardRoutes: Route[] = [
  {
    href: '/home',
    icon: Home,
    title: 'Home',
    description: 'Dashboard overview and summary',
  },
  {
    href: '/jobs',
    icon: Briefcase,
    title: 'Jobs',
    description: 'Track and manage your job applications',
  },
  {
    href: '/analytics',
    icon: BarChart2,
    title: 'Analytics',
    description: 'View statistics and insights',
  },
  {
    href: '/profile',
    icon: User,
    title: 'Profile',
    description: 'Manage your personal profile',
  },
  {
    href: '/settings',
    icon: Settings,
    title: 'Settings',
    description: 'Configure application settings',
  },
  {
    href: '/help',
    icon: HelpCircle,
    title: 'Help',
    description: 'Find help and support resources',
  },
];
