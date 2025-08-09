import { ShoppingCart } from 'lucide-react';
import React from 'react';

const Orders = () => {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Orders Management</h3>
      <p className="text-gray-600">Track and manage all your customer orders.</p>
    </div>
  );
};

export default Orders;
