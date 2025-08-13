'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Sidebar from '@/components/seller/Sidebar';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1">
        <header className="flex py-3  shrink-0 items-center gap-2 border-b border-gray-300 px-6">
          <SidebarTrigger onClick={()=>setSidebarOpen(!sidebarOpen)} className="hidden lg:flex items-center justify-center" />
          <div className="h-4 w-px hidden lg:block bg-sidebar-border" />
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>
        <div className="flex-1 space-y-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
