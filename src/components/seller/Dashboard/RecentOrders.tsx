import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getStatusColor, getStatusIcon } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

const RecentOrders = () => {
  const recentOrders = [
    {
      id: '#ORD-2024-001',
      customer: 'John Doe',
      product: 'Wireless Headphones',
      amount: 299.99,
      status: 'delivered',
      date: '2024-01-15',
    },
    {
      id: '#ORD-2024-002',
      customer: 'Sarah Chen',
      product: 'Smart Watch',
      amount: 199.99,
      status: 'shipped',
      date: '2024-01-14',
    },
    {
      id: '#ORD-2024-003',
      customer: 'Mike Johnson',
      product: 'Laptop Stand',
      amount: 49.99,
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: '#ORD-2024-004',
      customer: 'Emily Davis',
      product: 'USB-C Cable',
      amount: 19.99,
      status: 'canceled',
      date: '2024-01-13',
    },
    {
      id: '#ORD-2024-005',
      customer: 'Alex Wilson',
      product: 'Phone Case',
      amount: 24.99,
      status: 'delivered',
      date: '2024-01-13',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-orange-600" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.product}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${order.amount}</p>
                <Badge className={`text-xs ${getStatusColor(order.status)}`}>{order.status}</Badge>
                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
