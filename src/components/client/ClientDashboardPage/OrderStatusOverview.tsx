import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const OrderStatusOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { label: 'Delivered', count: 8, variant: 'default' },
            { label: 'Shipped', count: 2, variant: 'secondary' },
            { label: 'Pending', count: 2, variant: 'outline' },
            { label: 'Cancelled', count: 0, variant: 'destructive' },
          ].map((status) => (
            <div key={status.label} className="flex items-center justify-between">
              <span>{status.label}</span>
              <Badge variant={status.variant as "default"}>{status.count}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusOverview;
