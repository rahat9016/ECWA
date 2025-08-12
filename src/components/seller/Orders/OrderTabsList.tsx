import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const OrderTabsList = ({orderCounts}:{orderCounts: { all: number; pending: number; shipped: number; delivered: number; cancelled: number; }}) => {
  return (
    <TabsList className="grid w-full grid-cols-5">
      <TabsTrigger value="all" className="flex items-center gap-2">
        All ({orderCounts.all})
      </TabsTrigger>
      <TabsTrigger value="pending" className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Pending ({orderCounts.pending})
      </TabsTrigger>
      <TabsTrigger value="shipped" className="flex items-center gap-2">
        <Package className="h-4 w-4" />
        Shipped ({orderCounts.shipped})
      </TabsTrigger>
      <TabsTrigger value="delivered" className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4" />
        Delivered ({orderCounts.delivered})
      </TabsTrigger>
      <TabsTrigger value="cancelled" className="flex items-center gap-2">
        <XCircle className="h-4 w-4" />
        Cancelled ({orderCounts.cancelled})
      </TabsTrigger>
    </TabsList>
  );
};

export default OrderTabsList;
