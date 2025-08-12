import { Search, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Table as TanstackTable } from '@tanstack/react-table';
import { Order } from '@/types/order';

const OrdersFilters = ({
  globalFilter,
  setGlobalFilter,
  orderStatusFilter,
  setOrderStatusFilter,
  table,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  orderStatusFilter: string;
  setOrderStatusFilter: (value: string) => void;
  table: TanstackTable<Order>;
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Filters & Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Label htmlFor="search" className="text-sm font-medium mb-2 block">
              Search Products
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="Search by name or SKU..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {/* Stock Status Filter */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Stock Status</Label>
            <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['All Status', 'pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'All Status'
                      ? 'All Status'
                      : status
                          .split('_')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Column Visibility */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Show Columns</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 w-full justify-between bg-transparent">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Columns
                  </span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active Filters */}
        {(globalFilter || orderStatusFilter !== 'All Status') && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {globalFilter && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Search: &quot;{globalFilter}&quot;
                <button onClick={() => setGlobalFilter('')} className="ml-1 hover:text-blue-900">
                  ×
                </button>
              </Badge>
            )}

            {/* {stockStatusFilter !== 'All Status' && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Status: {stockStatusFilter.replace('_', ' ')}
                <button
                  onClick={() => setStockStatusFilter('All Status')}
                  className="ml-1 hover:text-orange-900"
                >
                  ×
                </button>
              </Badge>
            )} */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setGlobalFilter('');
                setOrderStatusFilter('All Status');
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersFilters;
