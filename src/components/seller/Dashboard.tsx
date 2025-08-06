"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { LayoutDashboard, Package, ShoppingCart, CreditCard, Settings, TrendingUp, TrendingDown, DollarSign, Users, Eye, Calendar, Clock, Truck, CheckCircle, XCircle, AlertCircle, Menu, X, Bell, Search, Filter, Download, RefreshCw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface RevenueData {
  name: string
  revenue: number
  orders: number
  profit?: number
}

// Sample data for revenue trends
const revenueData = [
  { name: "Jan", revenue: 12400, orders: 45, profit: 8200 },
  { name: "Feb", revenue: 15600, orders: 52, profit: 10400 },
  { name: "Mar", revenue: 18900, orders: 68, profit: 12600 },
  { name: "Apr", revenue: 22300, orders: 78, profit: 14800 },
  { name: "May", revenue: 19800, orders: 65, profit: 13200 },
  { name: "Jun", revenue: 25600, orders: 89, profit: 17100 },
  { name: "Jul", revenue: 28900, orders: 95, profit: 19300 },
  { name: "Aug", revenue: 31200, orders: 102, profit: 20800 },
  { name: "Sep", revenue: 27800, orders: 88, profit: 18500 },
  { name: "Oct", revenue: 33400, orders: 115, profit: 22300 },
  { name: "Nov", revenue: 36700, orders: 128, profit: 24500 },
  { name: "Dec", revenue: 42100, orders: 145, profit: 28100 },
]

// Weekly revenue data
const weeklyData = [
  { name: "Mon", revenue: 2400, orders: 12 },
  { name: "Tue", revenue: 3200, orders: 18 },
  { name: "Wed", revenue: 2800, orders: 15 },
  { name: "Thu", revenue: 4100, orders: 22 },
  { name: "Fri", revenue: 3800, orders: 20 },
  { name: "Sat", revenue: 5200, orders: 28 },
  { name: "Sun", revenue: 4600, orders: 25 },
]

// Order status distribution
const orderStatusData = [
  { name: "Delivered", value: 45, color: "#10b981" },
  { name: "Shipped", value: 25, color: "#3b82f6" },
  { name: "Pending", value: 20, color: "#f59e0b" },
  { name: "Canceled", value: 10, color: "#ef4444" },
]

// Top products data
const topProducts = [
  { name: "Wireless Headphones", sales: 245, revenue: 24500, growth: 12.5 },
  { name: "Smart Watch", sales: 189, revenue: 18900, growth: 8.3 },
  { name: "Laptop Stand", sales: 156, revenue: 7800, growth: -2.1 },
  { name: "USB-C Cable", sales: 298, revenue: 5960, growth: 15.7 },
  { name: "Phone Case", sales: 167, revenue: 3340, growth: 5.2 },
]

// Recent orders data
const recentOrders = [
  {
    id: "#ORD-2024-001",
    customer: "John Doe",
    product: "Wireless Headphones",
    amount: 299.99,
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: "#ORD-2024-002",
    customer: "Sarah Chen",
    product: "Smart Watch",
    amount: 199.99,
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "#ORD-2024-003",
    customer: "Mike Johnson",
    product: "Laptop Stand",
    amount: 49.99,
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "#ORD-2024-004",
    customer: "Emily Davis",
    product: "USB-C Cable",
    amount: 19.99,
    status: "canceled",
    date: "2024-01-13",
  },
  {
    id: "#ORD-2024-005",
    customer: "Alex Wilson",
    product: "Phone Case",
    amount: 24.99,
    status: "delivered",
    date: "2024-01-13",
  },
]

const sidebarItems = [
  {
    id: "overview",
    name: "Overview",
    icon: <LayoutDashboard className="w-5 h-5" />,
    active: true,
  },
  {
    id: "products",
    name: "Products",
    icon: <Package className="w-5 h-5" />,
    active: false,
  },
  {
    id: "orders",
    name: "Orders",
    icon: <ShoppingCart className="w-5 h-5" />,
    active: false,
  },
  {
    id: "payments",
    name: "Payments",
    icon: <CreditCard className="w-5 h-5" />,
    active: false,
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings className="w-5 h-5" />,
    active: false,
  },
]

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")

  // Calculate statistics
  const todaySales = 2847.50
  const weekSales = 18945.75
  const monthSales = 125678.90

  const todayOrders = { pending: 8, shipped: 12, delivered: 25, canceled: 2 }
  const weekOrders = { pending: 45, shipped: 78, delivered: 156, canceled: 12 }
  const monthOrders = { pending: 189, shipped: 298, delivered: 567, canceled: 45 }

  const getOrderStats = () => {
    switch (timeRange) {
      case "today":
        return todayOrders
      case "week":
        return weekOrders
      case "month":
      default:
        return monthOrders
    }
  }

  const getSalesAmount = () => {
    switch (timeRange) {
      case "today":
        return todaySales
      case "week":
        return weekSales
      case "month":
      default:
        return monthSales
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "canceled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">SellerHub</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">JD</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">John Doe</p>
              <p className="text-xs text-gray-600">Premium Seller</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
            Active Store
          </Badge>
        </div>
      </div>
    </div>
  )

  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {sidebarItems.find((item) => item.id === activeTab)?.name || "Overview"}
          </h1>
          <p className="text-sm text-gray-600">Welcome back, John! Here's your store overview.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search..." className="pl-10 w-64" />
        </div>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </Button>
        <Button variant="ghost" size="sm">
          <RefreshCw className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )

  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Sales Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold">${getSalesAmount().toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+12.5% from last period</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold">
                  {Object.values(getOrderStats()).reduce((a, b) => a + b, 0)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+8.2% from last period</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Order Value</p>
                <p className="text-3xl font-bold">
                  $
                  {(
                    getSalesAmount() / Object.values(getOrderStats()).reduce((a, b) => a + b, 0)
                  ).toFixed(2)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+3.1% from last period</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Conversion Rate</p>
                <p className="text-3xl font-bold">3.2%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">-1.2% from last period</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600">{getOrderStats().pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={65} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">65% of total orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Shipped Orders</p>
                <p className="text-2xl font-bold text-blue-600">{getOrderStats().shipped}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={45} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">45% of total orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Delivered Orders</p>
                <p className="text-2xl font-bold text-green-600">{getOrderStats().delivered}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">85% of total orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Canceled Orders</p>
                <p className="text-2xl font-bold text-red-600">{getOrderStats().canceled}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={15} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">15% of total orders</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends Chart */}
        <Card>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={
                    (timeRange === "week"
                      ? (weeklyData as RevenueData[])
                      : (revenueData as RevenueData[]))
                  }
                >
                <AreaChart
                  data={
                    (timeRange === "week"
                      ? (weeklyData as RevenueData[])
                      : (revenueData as RevenueData[]))
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? `$${value.toLocaleString()}` : value,
                      name === "revenue" ? "Revenue" : "Orders",
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

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {orderStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {product.growth > 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      )}
                      <span
                        className={`text-xs ${
                          product.growth > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${order.amount}</p>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "overview" && <OverviewContent />}
          {activeTab === "products" && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Products Management</h3>
              <p className="text-gray-600">Manage your product inventory, pricing, and details.</p>
            </div>
          )}
          {activeTab === "orders" && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Orders Management</h3>
              <p className="text-gray-600">Track and manage all your customer orders.</p>
            </div>
          )}
          {activeTab === "payments" && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payments & Payouts</h3>
              <p className="text-gray-600">Monitor your earnings and payment history.</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Store Settings</h3>
              <p className="text-gray-600">Configure your store preferences and account settings.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
