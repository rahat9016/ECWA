import { CreditCard } from 'lucide-react';
import React from 'react';

const Payments = () => {
  return (
    <div className="text-center py-12">
      <CreditCard className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Payments & Payouts</h3>
      <p className="text-gray-600">Monitor your earnings and payment history.</p>
    </div>
  );
};

export default Payments;
