import { Menu, Bell, Search, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarItems } from '@/docs/dashboard';

const Header = ({
  setSidebarOpen,
  activeTab,
}: {
  setSidebarOpen: (value: boolean) => void;
  activeTab: string;
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {SidebarItems.find((item) => item.name === activeTab)?.name || 'Overview'}
          </h1>
          <p className="text-sm text-gray-600">Welcome back, John! Here&apos;s your store overview.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search..." className="pl-10 w-64" />
        </div>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </Button>
        <Button variant="ghost" size="sm">
          <RefreshCw className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
