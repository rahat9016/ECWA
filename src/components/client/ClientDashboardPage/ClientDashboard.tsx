import Link from 'next/link';
import { Package, Heart, Truck, Ticket } from 'lucide-react';
import DashboardCard from '../../DashboardCard';
import RecentOrders from './RecentOrders';
import OrderStatusOverview from './OrderStatusOverview';
import RecentActivity from './RecentActivity';
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

const ClientDashboardPage = () => {
  return (
    <div className="flex flex-col gap-3 lg:gap-6 p-4 md:p-6 min-h-screen">
      <div className="grid gap-2 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Link href={card.link} key={card.title}>
            <DashboardCard {...card} />
          </Link>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrders />
        <OrderStatusOverview />
      </div>
      <RecentActivity />
    </div>
  );
};

export default ClientDashboardPage;
