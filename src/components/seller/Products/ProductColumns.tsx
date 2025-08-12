import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductStatus, getStatusBadge } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Product } from '@/types/product';

const ProductColumns = (handleDeleteClick: (product: Product) => void) => {
  const columnHelper = createColumnHelper<Product>();
  return [
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ getValue, row }) => (
        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={getValue() || '/placeholder.svg'}
            alt={row.original.name}
            fill
            className="object-cover"
          />
        </div>
      ),
      enableSorting: false,
      size: 80,
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Name
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ getValue, row }) => (
        <div>
          <p className="font-semibold text-gray-900">{getValue()}</p>
          <p className="text-sm text-gray-500">{row.original.category}</p>
        </div>
      ),
    }),
    columnHelper.accessor('sku', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          SKU
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ getValue }) => (
        <Badge variant="secondary" className=" font-mono">
          {getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('price', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Price
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-900">${getValue().toFixed(2)}</span>
      ),
    }),
    columnHelper.accessor('stock', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Stock
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ getValue }) => {
        const stock = getValue();
        return (
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold ${
                stock === 0 ? 'text-red-600' : stock <= 5 ? 'text-yellow-600' : 'text-green-600'
              }`}
            >
              {stock}
            </span>
            <span className="text-sm text-gray-500">units</span>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = getProductStatus(row.original.stock);
        return getStatusBadge(status);
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
    }),
    columnHelper.accessor('createdAt', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Created
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">{new Date(getValue()).toLocaleDateString()}</span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/seller/products/edit-product/${row.original.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(row.original)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      size: 100,
    }),
  ];
};

export default ProductColumns;
