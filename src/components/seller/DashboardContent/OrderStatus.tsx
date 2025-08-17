import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

const OrderStatus = ({ timeRange }: { timeRange: string }) => {
  const todayOrders = { pending: 8, shipped: 12, delivered: 25, canceled: 2 };
  const weekOrders = { pending: 45, shipped: 78, delivered: 156, canceled: 12 };
  const monthOrders = { pending: 189, shipped: 298, delivered: 567, canceled: 45 };

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
  const orderStatsData = [
    {
      label: 'Pending Orders',
      value: getOrderStats().pending,
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      progress: 65,
      progressText: '65% of total orders',
    },
    {
      label: 'Shipped Orders',
      value: getOrderStats().shipped,
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      progress: 45,
      progressText: '45% of total orders',
    },
    {
      label: 'Delivered Orders',
      value: getOrderStats().delivered,
      textColor: 'text-green-600',
      bgColor: 'bg-green-100',
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      progress: 85,
      progressText: '85% of total orders',
    },
    {
      label: 'Canceled Orders',
      value: getOrderStats().canceled,
      textColor: 'text-red-600',
      bgColor: 'bg-red-100',
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      progress: 15,
      progressText: '15% of total orders',
    },
  ];

  return (
    <>
      {orderStatsData.map((stat, idx) => (
        <Card key={idx} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>{stat.icon}</div>
            </div>
            <div className="mt-4">
              <Progress value={stat.progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">{stat.progressText}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default OrderStatus;
