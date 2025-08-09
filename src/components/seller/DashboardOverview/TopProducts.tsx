import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingDown, TrendingUp } from 'lucide-react';

const TopProducts = () => {
  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: 24500, growth: 12.5 },
    { name: 'Smart Watch', sales: 189, revenue: 18900, growth: 8.3 },
    { name: 'Laptop Stand', sales: 156, revenue: 7800, growth: -2.1 },
    { name: 'USB-C Cable', sales: 298, revenue: 5960, growth: 15.7 },
    { name: 'Phone Case', sales: 167, revenue: 3340, growth: 5.2 },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-purple-600" />
          Top Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  {product.growth > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-600" />
                  )}
                  <span
                    className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {product.growth > 0 ? '+' : ''}
                    {product.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
