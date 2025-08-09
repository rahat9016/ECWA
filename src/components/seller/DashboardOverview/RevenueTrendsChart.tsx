import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// Sample data for revenue trends
const revenueData = [
  { name: 'Jan', revenue: 12400, orders: 45, profit: 8200 },
  { name: 'Feb', revenue: 15600, orders: 52, profit: 10400 },
  { name: 'Mar', revenue: 18900, orders: 68, profit: 12600 },
  { name: 'Apr', revenue: 22300, orders: 78, profit: 14800 },
  { name: 'May', revenue: 19800, orders: 65, profit: 13200 },
  { name: 'Jun', revenue: 25600, orders: 89, profit: 17100 },
  { name: 'Jul', revenue: 28900, orders: 95, profit: 19300 },
  { name: 'Aug', revenue: 31200, orders: 102, profit: 20800 },
  { name: 'Sep', revenue: 27800, orders: 88, profit: 18500 },
  { name: 'Oct', revenue: 33400, orders: 115, profit: 22300 },
  { name: 'Nov', revenue: 36700, orders: 128, profit: 24500 },
  { name: 'Dec', revenue: 42100, orders: 145, profit: 28100 },
];

// Weekly revenue data
const weeklyData = [
  { name: 'Mon', revenue: 2400, orders: 12 },
  { name: 'Tue', revenue: 3200, orders: 18 },
  { name: 'Wed', revenue: 2800, orders: 15 },
  { name: 'Thu', revenue: 4100, orders: 22 },
  { name: 'Fri', revenue: 3800, orders: 20 },
  { name: 'Sat', revenue: 5200, orders: 28 },
  { name: 'Sun', revenue: 4600, orders: 25 },
];

const RevenueTrendsChart = ({ timeRange }: { timeRange: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Revenue Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeRange === 'week' ? weeklyData : revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Orders',
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueTrendsChart;
