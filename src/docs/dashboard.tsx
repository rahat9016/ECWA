import { LayoutDashboard, Package, ShoppingCart, CreditCard, Settings } from 'lucide-react';

export const SidebarItems = [
  {
    name: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: 'products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: 'orders',
    label: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    name: 'payments',
    label: 'Payments',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
  },
];
