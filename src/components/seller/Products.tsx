import { Package } from 'lucide-react';
import React from 'react';

const Products = () => {
  return (
    <div className="text-center py-12">
      <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Products Management</h3>
      <p className="text-gray-600">Manage your product inventory, pricing, and details.</p>
    </div>
  );
};

export default Products;
