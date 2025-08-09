
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
} from 'lucide-react';



export const SidebarItems = [
  {
    id: 'overview',
    name: 'Overview',
    icon: <LayoutDashboard className="w-5 h-5" />,
    active: true,
  },
  {
    id: 'products',
    name: 'Products',
    icon: <Package className="w-5 h-5" />,
    active: false,
  },
  {
    id: 'orders',
    name: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    active: false,
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: <CreditCard className="w-5 h-5" />,
    active: false,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    active: false,
  },
];