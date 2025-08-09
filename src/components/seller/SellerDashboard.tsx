'use client';

import { useState } from 'react';
import Products from './Products';
import Orders from './Orders';
import Payments from './Payments';
import SellerSettings from './SellerSettings';
import DashboardOverview from './DashboardOverview/DashboardOverview';
import Sidebar from './Sidebar';
import Header from './Header';



export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'delivered':
  //       return <CheckCircle className="w-4 h-4 text-green-600" />;
  //     case 'shipped':
  //       return <Truck className="w-4 h-4 text-blue-600" />;
  //     case 'pending':
  //       return <Clock className="w-4 h-4 text-yellow-600" />;
  //     case 'canceled':
  //       return <XCircle className="w-4 h-4 text-red-600" />;
  //     default:
  //       return <AlertCircle className="w-4 h-4 text-gray-600" />;
  //   }
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'delivered':
  //       return 'bg-green-100 text-green-800';
  //     case 'shipped':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'canceled':
  //       return 'bg-red-100 text-red-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };




  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header setSidebarOpen={setSidebarOpen} activeTab={activeTab} />
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <DashboardOverview timeRange={timeRange} setTimeRange={setTimeRange} />
          )}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'payments' && <Payments />}
          {activeTab === 'settings' && <SellerSettings />}
        </main>
      </div>
    </div>
  );
}
