import React from 'react';
import { SidebarNav } from './sidebar-nav';
import { TopNav } from './top-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="bg-background flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
