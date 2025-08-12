import { SAMPLE_PRODUCTS } from '@/docs/products';
import { getProductStatus } from '@/lib/utils';
import { useMemo } from 'react';
import { Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';

const ProductStatisticsCards = () => {
  const products = SAMPLE_PRODUCTS;

  const status = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => getProductStatus(p.stock) === 'active').length;
    const lowStock = products.filter((p) => getProductStatus(p.stock) === 'low_stock').length;
    const outOfStock = products.filter((p) => getProductStatus(p.stock) === 'out_of_stock').length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    return { total, active, lowStock, outOfStock, totalValue };
  }, [products]);

  const CardData = [
    {
      title: 'Total Products',
      value: status.total,
      bgColor: 'from-blue-500 to-blue-600',
      mainIcon: Package,
    },
    {
      title: 'Active',
      value: status.active,
      bgColor: 'from-green-500 to-green-600',
      mainIcon: CheckCircle,
    },
    {
      title: 'Low Stock',
      value: status.lowStock,
      bgColor: 'from-yellow-500 to-orange-500',
      mainIcon: AlertTriangle,
    },
    {
      title: 'Out of Stock',
      value: status.outOfStock,
      bgColor: 'from-red-500 to-red-600',
      mainIcon: XCircle,
    },
    {
      title: 'Total Value',
      value: `${status.totalValue.toLocaleString()}`,
      bgColor: 'from-purple-500 to-purple-600',
      mainIcon: Package,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {CardData.map((item, idx) => (
        <DashboardCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default ProductStatisticsCards;
