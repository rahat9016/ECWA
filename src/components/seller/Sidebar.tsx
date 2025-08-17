import { SidebarItems } from '@/docs/dashboard';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}: {
  activeTab: string;
  setActiveTab: (value: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">SellerHub</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {SidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors ${
                activeTab === item.name
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">JD</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">John Doe</p>
              <p className="text-xs text-gray-600">Premium Seller</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
            Active Store
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
