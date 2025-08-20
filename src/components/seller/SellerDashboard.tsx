'use client';

import { useState } from 'react';
import Products from './Products/Products';
import Orders from './Orders/Orders';
import Payments from './Payments';
import SellerSettings from './SellerSettings';
import Dashboard from './DashboardContent/Dashboard';



export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/seller');
  const [timeRange, setTimeRange] = useState('month');
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full flex flex-col min-w-0">
        {/* <Header setSidebarOpen={setSidebarOpen} activeTab={activeTab} /> */}
        <main className="p-0 lg:p-6 overflow-auto w-full">
          {activeTab === 'overview' && (
            <Dashboard timeRange={timeRange} setTimeRange={setTimeRange} />
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
