'use client';
import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table';
import { Product } from '@/types/product';
import Pagination from '../../Pagination';
import { MockOrders } from '@/docs/Orders';
import { Order } from '@/types/order';
import OrderColumns from './OrderColumns';
import OrdersFilters from './OrdersFilters';
import OrdersDataTable from './OrdersDataTable';
import OrderStatisticsCards from './OrderStatisticsCards';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(MockOrders);
  const [globalFilter, setGlobalFilter] = useState('');
  // const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All Status');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category: false,
    createdAt: false,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Handle delete
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };


  console.log(setOrders, deleteDialogOpen,productToDelete,isCancelModalOpen,selectedOrderId, handleDeleteClick);


  const handleReorder = (orderId: string) => {
    alert(`Reordering order ${orderId}`);
  };

  const handleBuyAgain = (orderId: string) => {
    alert(`Buying again items from order ${orderId}`);
  };

  const handleGiveReview = (orderId: string) => {
    alert(`Giving review for order ${orderId}`);
  };

  // const handleCancelOrder = (orderId: string, reason: string) => {
  //   setOrders((prev) =>
  //     prev.map((order) =>
  //       order.id === orderId
  //         ? {
  //             ...order,
  //             status: 'cancelled',
  //             timeline: [
  //               ...order.timeline.filter((e) => e.title !== 'Cancelled'),
  //               {
  //                 id: `cancel-${orderId}`,
  //                 title: 'Cancelled',
  //                 description: `Order cancelled: ${reason}`,
  //                 date: new Date().toISOString(),
  //                 status: 'completed',
  //               },
  //             ],
  //           }
  //         : order,
  //     ),
  //   );
  //   setIsCancelModalOpen(false);
  //   setSelectedOrderId(null);
  // };

  // Define columns
  const columns = useMemo(
    () =>
      OrderColumns(
        handleBuyAgain,
        handleReorder,
        setSelectedOrderId,
        setIsCancelModalOpen,
        handleGiveReview,
      ),
    [],
  );

  // Filter data based on category and stock status
  const filteredData = useMemo(() => {
    return orders.filter((order) => {
      const matchesStockStatus =
        orderStatusFilter === 'All Status' || orderStatusFilter === order.status;
      return matchesStockStatus;
    });
  }, [orders, orderStatusFilter]);

  // Create table instance
  const table = useReactTable<Order>({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      const orderId = row.original.id.toLowerCase();
      const amount = row.original.amount;
      return orderId.includes(searchValue) || amount.toString().includes(searchValue);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container flex flex-col py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">
              Manage your order inventory ({table.getFilteredRowModel().rows.length} orders)
            </p>
          </div>
        </div>
        {/* Statistics Cards */}
        <OrderStatisticsCards />
        {/* Filters and Search */}
        <OrdersFilters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          orderStatusFilter={orderStatusFilter}
          setOrderStatusFilter={setOrderStatusFilter}
          table={table}
        />

        {/* Orders Table */}
        <OrdersDataTable
          table={table}
          globalFilter={globalFilter}
          orderStatusFilter={orderStatusFilter}
          columnLength={columns.length}
        />

        {/* Pagination */}
        <Pagination table={table} />
      </div>
    </div>
  );
};

export default MyOrdersPage;
