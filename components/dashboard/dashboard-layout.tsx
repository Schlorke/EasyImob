'use client';

import { useState } from 'react';
import type React from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
