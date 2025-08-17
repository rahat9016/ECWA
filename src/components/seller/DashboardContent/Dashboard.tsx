
import TimeRangeSelector from './TimeRangeSelector';
import SalesStatistics from './SalesStatistics';
import OrderStatus from './OrderStatus';
import TopProducts from './TopProducts';
import RecentOrders from './RecentOrders';
import RevenueTrendsChart from './RevenueTrendsChart';
import OrderStatusDistribution from './OrderStatusDistribution';

const Dashboard = ({timeRange, setTimeRange}:{timeRange:string, setTimeRange:(value:string)=>void}) => {
  return (
    <div className="flex flex-col gap-5">
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
        <SalesStatistics timeRange={timeRange} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
        <OrderStatus timeRange={timeRange} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueTrendsChart timeRange={timeRange} />
        <OrderStatusDistribution />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopProducts />
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
