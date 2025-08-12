'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Heart, Truck, Ticket, Activity } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { RecentActivityItem } from '@/types/client';
import DashboardCard from '../DashboardCard';

const clientInfo = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
};

const dashboardCards = [
  {
    title: 'Total Orders',
    value: '125',
    mainIcon: Package,
    bgColor: 'from-blue-500 to-blue-700',
    link: '/client/orders',
  },
  {
    title: 'Wishlist Items',
    value: '18',
    mainIcon: Heart,
    bgColor: 'from-pink-500 to-pink-700',
    link: '/client/wishlist',
  },
  {
    title: 'Pending Deliveries',
    value: '3',
    mainIcon: Truck,
    bgColor: 'from-orange-500 to-orange-700',
    link: '/client/orders?status=pending',
  },
  {
    title: 'Active Coupons',
    value: '2',
    mainIcon: Ticket,
    bgColor: 'from-green-500 to-green-700',
    link: '/client/coupons', // Assuming a coupons page exists or will be created
  },
];

const recentActivity: RecentActivityItem[] = [
  {
    id: 'act1',
    type: 'order',
    description: 'Order #ORD001 placed',
    date: '2023-10-26',
    status: 'pending',
  },
  {
    id: 'act2',
    type: 'delivery',
    description: 'Order #ORD003 delivered',
    date: '2023-10-25',
    status: 'delivered',
  },
  {
    id: 'act3',
    type: 'wishlist',
    description: 'Added "Smartwatch" to wishlist',
    date: '2023-10-24',
  },
  {
    id: 'act4',
    type: 'order',
    description: 'Order #ORD002 shipped',
    date: '2023-10-23',
    status: 'shipped',
  },
  { id: 'act5', type: 'coupon', description: 'New coupon "SAVE20" available', date: '2023-10-22' },
  {
    id: 'act6',
    type: 'order',
    description: 'Order #ORD005 cancelled',
    date: '2023-10-21',
    status: 'cancelled',
  },
];

const ClientDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, {clientInfo.name}!</h1>
        <p className="text-gray-500 hidden md:block">{clientInfo.email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Link href={card.link} key={card.title}>
            <DashboardCard {...card} />
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Activity className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid gap-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    {activity.type === 'order' && <Package className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'wishlist' && <Heart className="h-5 w-5 text-pink-500" />}
                    {activity.type === 'delivery' && <Truck className="h-5 w-5 text-orange-500" />}
                    {activity.type === 'coupon' && <Ticket className="h-5 w-5 text-green-500" />}
                  </div>
                  <div className="grid flex-1 gap-1">
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  {activity.status && (
                    <Badge
                      className={`
                        ${activity.status === 'pending' && 'bg-yellow-500 hover:bg-yellow-500/80 text-white'}
                        ${activity.status === 'shipped' && 'bg-blue-500 hover:bg-blue-500/80 text-white'}
                        ${activity.status === 'delivered' && 'bg-green-500 hover:bg-green-500/80 text-white'}
                        ${activity.status === 'cancelled' && 'bg-red-500 hover:bg-red-500/80 text-white'}
                      `}
                    >
                      {activity.status}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboardPage;
