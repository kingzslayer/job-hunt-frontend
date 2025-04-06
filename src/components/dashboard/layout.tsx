'use client';

import React, { useState } from 'react';
import { SidebarNav } from './sidebar-nav';
import { TopNav } from './top-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Mobile sidebar - hidden on larger screens */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-64">
          <SidebarNav onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <SidebarNav />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav showSidebarButton onSidebarOpen={() => setSidebarOpen(true)} />
        <main className="bg-background flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
