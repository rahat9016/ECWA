'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { SAMPLE_PRODUCTS } from '@/docs/products';

import { Product } from '@/types/product';
import ProductsFilters from './ProductsFilters';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import Pagination from '../../Pagination';
import { getProductStatus } from '@/lib/utils';
import DataTable from './DataTable';
import ProductColumns from './ProductColumns';
import ProductStatisticsCards from './ProductStatisticsCards';

const Products = () => {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockStatusFilter, setStockStatusFilter] = useState('All Status');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category: false,
    createdAt: false,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Handle delete
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  // Define columns
  const columns = useMemo(() => ProductColumns(handleDeleteClick), []);

  // Filter data based on category and stock status
  const filteredData = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        categoryFilter === 'All Categories' || product.category === categoryFilter;
      const productStatus = getProductStatus(product.stock);
      const matchesStockStatus =
        stockStatusFilter === 'All Status' || productStatus === stockStatusFilter;
      return matchesCategory && matchesStockStatus;
    });
  }, [products, categoryFilter, stockStatusFilter]);

  // Create table instance
  const table = useReactTable<Product>({
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
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      const name = row.original.name.toLowerCase();
      const sku = row.original.sku.toLowerCase();
      return name.includes(searchValue) || sku.includes(searchValue);
    },
  });

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container flex flex-col py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              Manage your product inventory ({table.getFilteredRowModel().rows.length} products)
            </p>
          </div>
          <Link href="/seller/products/add-product">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <ProductStatisticsCards />
        {/* Filters and Search */}
        <ProductsFilters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          stockStatusFilter={stockStatusFilter}
          setStockStatusFilter={setStockStatusFilter}
          table={table}
        />

        {/* Products Table */}
        <DataTable
          table={table}
          globalFilter={globalFilter}
          categoryFilter={categoryFilter}
          stockStatusFilter={stockStatusFilter}
          columnLength={columns.length}
        />

        {/* Pagination */}
        <Pagination table={table} />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          productToDelete={productToDelete}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default Products;
