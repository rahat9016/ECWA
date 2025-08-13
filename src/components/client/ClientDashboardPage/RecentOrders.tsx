import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const RecentOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[
            { id: 'ORD-1001', date: '2023-10-26', amount: '$199.00' },
            { id: 'ORD-1002', date: '2023-10-20', amount: '$350.00' },
            { id: 'ORD-1003', date: '2023-10-15', amount: '$245.00' },
          ].map((order) => (
            <div key={order.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="ml-auto font-medium">{order.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
