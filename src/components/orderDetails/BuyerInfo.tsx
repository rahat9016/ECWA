
import {
  MapPin,
  CreditCard,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types/order';


const BuyerInfo = ({order}:{order:Order}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Buyer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{order.buyerName}</p>
          <p className="text-sm text-muted-foreground">{order.buyerEmail}</p>
          <p className="text-sm text-muted-foreground">{order.buyerPhone}</p>
        </div>
        <Separator />
        <div>
          <p className="font-medium flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            Shipping Address
          </p>
          <div className="text-sm text-muted-foreground">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
        <Separator />
        <div>
          <p className="font-medium flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4" />
            Payment Information
          </p>
          <div className="text-sm">
            <p>Type: {order.paymentType.toUpperCase()}</p>
            <p>
              Status:{' '}
              <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                {order.paymentStatus}
              </Badge>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BuyerInfo