import { Clock, Package, DollarSign, TrendingUp } from 'lucide-react';
import { Order } from '@/types/order';
import DashboardCard from '@/components/DashboardCard';

const OrderStatisticsCards = ({ orders }: { orders: Order[] }) => {
  const getOrderCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter((o: Order) => o.status === 'pending').length,
      shipped: orders.filter((o: Order) => o.status === 'shipped').length,
      delivered: orders.filter((o: Order) => o.status === 'delivered').length,
      cancelled: orders.filter((o: Order) => o.status === 'cancelled').length,
    };
  };
  const orderCounts = getOrderCounts();
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const avgOrderValue = totalRevenue / orders.length;

  const StatisticsCardData = [
    {
      bgColor: 'from-blue-600 to-indigo-600 text-blue-100',
      title: 'Total Orders',
      value: orderCounts.all,
      subtitle: 'All time orders',
      mainIcon: Package,
    },
    {
      bgColor: 'from-green-600 to-emerald-600 text-green-100',
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      subtitle: 'From all orders',
      mainIcon: DollarSign,
    },
    {
      bgColor: 'from-purple-600 to-pink-600 text-purple-100',
      title: 'Avg Order Value',
      value: `$${avgOrderValue.toFixed(2)}`,
      subtitle: 'Per order average',
      mainIcon: TrendingUp,
    },
    {
      bgColor: 'from-orange-600 to-red-600 text-orange-100',
      title: 'Pending Orders',
      value: orderCounts.pending,
      subtitle: 'Awaiting processing',
      mainIcon: Clock,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {StatisticsCardData.map((card, idx) => (
        <DashboardCard key={idx} {...card} />
      ))}
    </div>
  );
};

export default OrderStatisticsCards;
