import { ShoppingCart, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

const SalesStatistics = ({ timeRange }: { timeRange: string }) => {
  const todayOrders = { pending: 8, shipped: 12, delivered: 25, canceled: 2 };
  const weekOrders = { pending: 45, shipped: 78, delivered: 156, canceled: 12 };
  const monthOrders = { pending: 189, shipped: 298, delivered: 567, canceled: 45 };

  // Calculate statistics
  const todaySales = 2847.5;
  const weekSales = 18945.75;
  const monthSales = 125.9;

  const getOrderStats = () => {
    switch (timeRange) {
      case 'today':
        return todayOrders;
      case 'week':
        return weekOrders;
      case 'month':
      default:
        return monthOrders;
    }
  };

  const getSalesAmount = () => {
    switch (timeRange) {
      case 'today':
        return todaySales;
      case 'week':
        return weekSales;
      case 'month':
      default:
        return monthSales;
    }
  };

  const status = [
    {
      title: 'Total Sales',
      value: `${getSalesAmount().toLocaleString()}`,
      subtitle: '+12.5% from last period',
      subtitleIcon: TrendingUp,
      bgColor: 'from-blue-600 to-indigo-600 text-blue-100',
      mainIcon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: Object.values(getOrderStats()).reduce((a, b) => a + b, 0),
      subtitle: '+8.2% from last period',
      subtitleIcon: TrendingUp,
      bgColor: 'from-green-600 to-emerald-600 text-green-100',
      mainIcon: ShoppingCart,
    },
    {
      title: 'Avg Order Value',
      value: `${(
        getSalesAmount() / Object.values(getOrderStats()).reduce((a, b) => a + b, 0)
      ).toFixed(2)}`,
      subtitle: '+3.1% from last period',
      subtitleIcon: TrendingUp,
      bgColor: 'from-purple-600 to-pink-600 text-purple-100',
      mainIcon: TrendingUp,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      subtitle: '-1.2% from last period',
      subtitleIcon: TrendingDown,
      bgColor: 'from-orange-600 to-red-600 text-orange-100',
      mainIcon: Users,
    },
  ];
  return (
    <>
      {status.map((item, index) => (
        <DashboardCard key={index} {...item} />
      ))}
    </>
  );
};

export default SalesStatistics;
