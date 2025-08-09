import { ShoppingCart, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SalesStatistics = ({ timeRange }: { timeRange: string }) => {
  const todayOrders = { pending: 8, shipped: 12, delivered: 25, canceled: 2 };
  const weekOrders = { pending: 45, shipped: 78, delivered: 156, canceled: 12 };
  const monthOrders = { pending: 189, shipped: 298, delivered: 567, canceled: 45 };

  // Calculate statistics
  const todaySales = 2847.5;
  const weekSales = 18945.75;
  const monthSales = 125678.9;

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

  const stats = [
    {
      title: 'Total Sales',
      value: `$${getSalesAmount().toLocaleString()}`,
      subtitle: '+12.5% from last period',
      subtitleIcon: <TrendingUp className="w-4 h-4" />,
      colors: 'from-blue-600 to-indigo-600 text-blue-100',
      mainIcon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Total Orders',
      value: Object.values(getOrderStats()).reduce((a, b) => a + b, 0),
      subtitle: '+8.2% from last period',
      subtitleIcon: <TrendingUp className="w-4 h-4" />,
      colors: 'from-green-600 to-emerald-600 text-green-100',
      mainIcon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: 'Avg Order Value',
      value: `$${(
        getSalesAmount() / Object.values(getOrderStats()).reduce((a, b) => a + b, 0)
      ).toFixed(2)}`,
      subtitle: '+3.1% from last period',
      subtitleIcon: <TrendingUp className="w-4 h-4" />,
      colors: 'from-purple-600 to-pink-600 text-purple-100',
      mainIcon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      subtitle: '-1.2% from last period',
      subtitleIcon: <TrendingDown className="w-4 h-4" />,
      colors: 'from-orange-600 to-red-600 text-orange-100',
      mainIcon: <Users className="w-6 h-6" />,
    },
  ];
  return (
    <>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-r ${stat.colors.replace(/text-.*/, 'text-white')}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${stat.colors.split(' ').pop()} text-sm font-medium`}>
                  {stat.title}
                </p>
                <p className="text-3xl font-bold">{String(stat.value)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.subtitleIcon}
                  <span className="text-sm">{stat.subtitle}</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full">{stat.mainIcon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SalesStatistics;
