import DashboardCard from '@/components/DashboardCard';
import { CheckCircle, Package, ShoppingCart, Truck } from 'lucide-react';
import React from 'react';

const OrderStatisticsCards = () => {
  const OrderStatisticsData = [
    {
      title: 'Total Orders',
      value: '50',
      subtitle: 'All time orders',
      mainIcon: Package,
      bgColor: 'from-blue-500 to-blue-600',
    },
    {
      title: 'In Transit',
      value: '11',
      subtitle: 'Currently shipping',
      mainIcon: Truck,
      bgColor: 'from-orange-600 to-amber-600 text-orange-100',
    },
    {
      title: 'Delivered',
      value: '11',
      subtitle: 'Successfully delivered',
      mainIcon: CheckCircle,
      bgColor: 'from-green-500 to-green-600 ',
    },
    {
      title: 'Total Spent',
      value: '$13333.92',
      subtitle: 'All time spending',
      mainIcon: ShoppingCart,
      bgColor: 'from-purple-500 to-purple-600 text-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {OrderStatisticsData.map((item, idx) => (
        <DashboardCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default OrderStatisticsCards;
