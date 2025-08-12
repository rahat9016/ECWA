import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, ShoppingCart, Repeat, X, Star } from 'lucide-react';
import { getStatusColor } from '@/lib/utils';
import { Order } from '@/types/order';

const OrderColumns = (
  handleBuyAgain: (orderId: string) => void,
  handleReorder: (orderId: string) => void,
  setSelectedOrderId: (orderId: string | null) => void,
  setIsCancelModalOpen: (value: boolean) => void,
  handleGiveReview: (orderId: string) => void,
) => {
  const columnHelper = createColumnHelper<Order>();
  return [
    columnHelper.accessor('id', {
      header: 'Order ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('amount', {
      header: 'Total',
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <Badge className={getStatusColor(info.getValue())}>{info.getValue()}</Badge>,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem asChild>
              <Link href={`/client/my-orders/${row.original.id}`}>
                <Eye className="mr-2 h-4 w-4" /> Track Order Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBuyAgain(row.original.id)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Buy Again
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReorder(row.original.id)}>
              <Repeat className="mr-2 h-4 w-4" /> Reorder
            </DropdownMenuItem>
            {row.original.status !== 'cancelled' && row.original.status !== 'delivered' && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedOrderId(row.original.id);
                  setIsCancelModalOpen(true);
                }}
              >
                <X className="mr-2 h-4 w-4" /> Cancel Order
              </DropdownMenuItem>
            )}
            {row.original.status === 'delivered' && (
              <DropdownMenuItem onClick={() => handleGiveReview(row.original.id)}>
                <Star className="mr-2 h-4 w-4" /> Give Review
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];
};

export default OrderColumns;
