import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Order } from '@/types/order';

const OrderItemCard = ({ item }: { item: Order['items'][0] }) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-16 w-16 rounded-sm">
        <AvatarImage className="" src={item.image || '/placeholder.svg'} alt={item.name} />
        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{item.name}</p>
        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
      </div>
      <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
    </div>
  );
};

export default OrderItemCard;
