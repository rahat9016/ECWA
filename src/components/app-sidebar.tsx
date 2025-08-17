'use client';
import { LayoutDashboard, Package, Heart, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();
  const navItems = [
    {
      title: 'Overview',
      href: '/client/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'My Orders',
      href: '/client/orders',
      icon: Package,
    },
    {
      title: 'Wishlist',
      href: '/client/wishlist',
      icon: Heart,
    },
    {
      title: 'Profile',
      href: '/client/profile',
      icon: User,
    },
    {
      title: 'Settings',
      href: '/client/settings',
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="top-24">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">A</span>
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">My App</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href} className='hover:bg-gray-100 p-0 rounded-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href} className=''>
                      <div>
                        <item.icon
                          size={24}
                          className="h-5 w-5 scale-100"
                        />
                      </div>
                      <p className="font-medium text-[16px] ">{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
