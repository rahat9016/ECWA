'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Eye, Truck, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/order';
import { getStatusColor, getStatusIcon } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const OrdersColumns = (handleShipOrder: (orderId: string) => void, router: AppRouterInstance) => {
  const columnHelper = createColumnHelper<Order>();

  return [
    columnHelper.accessor('id', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    }),

    columnHelper.accessor('date', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{new Date(row.getValue('date')).toLocaleDateString()}</div>,
    }),

    columnHelper.accessor('buyerName', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Buyer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('buyerName')}</div>,
    }),

    columnHelper.accessor('amount', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as Order['status'];
        return (
          <Badge className={`${getStatusColor(status)} flex items-center gap-1 w-fit`}>
            {getStatusIcon(status)}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    }),

    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex items-center  gap-2">
            <Button
              title="Order Details"
              variant="outline"
              onClick={() => router.push(`/seller/orders/${order.id}`)}
              className="flex items-center"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {order.status === 'pending' && (
              <Button
                title="Ship Order"
                variant="outline"
                onClick={() => handleShipOrder(order.id)}
                className="flex items-center"
              >
                <Truck className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      },
    }),
  ];
};

export default OrdersColumns;
