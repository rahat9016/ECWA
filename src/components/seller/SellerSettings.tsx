import { Settings } from 'lucide-react';
import React from 'react';

const SellerSettings = () => {
  return (
    <div className="text-center py-12">
      <Settings className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Store Settings</h3>
      <p className="text-gray-600">Configure your store preferences and account settings.</p>
    </div>
  );
};

export default SellerSettings;
