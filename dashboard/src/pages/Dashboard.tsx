
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Users, Package, CreditCard, PieChart, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridBackground } from "@/components/ui/grid-background";

const Dashboard = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const customers = useSelector((state: RootState) => state.customers.customers);
  const products = useSelector((state: RootState) => state.products.products);

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

  // Data for charts
  const orderStatusData = [
    { name: 'Pending', value: pendingOrders, color: '#f59e0b' },
    { name: 'Shipped', value: shippedOrders, color: '#3b82f6' },
    { name: 'Delivered', value: deliveredOrders, color: '#10b981' },
    { name: 'Cancelled', value: cancelledOrders, color: '#ef4444' }
  ];

  return (
    <div className="relative animate-fade-in">
      <GridBackground className="absolute inset-0 z-0 opacity-10" />
      
      <div className="relative z-10 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-2 flex items-center">
          Dashboard 
          <Sparkles className="w-5 h-5 text-blue-400 ml-2" />
        </h1>
        <p className="text-sm sm:text-base text-blue-300/80">
          Welcome to the Order Management System
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="from-blue-600/20 to-blue-800/20"
          borderColor="border-blue-700/30"
          highlight="bg-blue-500"
          path="/orders"
          trend={+5.2}
        />
        <StatCard
          title="Total Customers"
          value={customers.length}
          icon={<Users className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="from-indigo-600/20 to-indigo-800/20"
          borderColor="border-indigo-700/30"
          highlight="bg-indigo-500"
          path="/customers"
          trend={+2.5}
        />
        <StatCard
          title="Total Products"
          value={products.length}
          icon={<Package className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="from-purple-600/20 to-purple-800/20"
          borderColor="border-purple-700/30"
          highlight="bg-purple-500"
          path="/products"
          trend={+1.8}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="from-cyan-600/20 to-blue-700/20"
          borderColor="border-cyan-700/30"
          highlight="bg-cyan-500"
          path="/orders"
          trend={+12.5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="modern-card animate-slide-in delay-100">
          <div className="modern-card-header">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg md:text-xl font-semibold text-white">Order Status</h2>
              <PieChart className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-blue-300/70">Distribution of order statuses</p>
          </div>
          <CardContent className="p-4">
            <div className="h-64 md:h-80 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData} margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#a3b3bc' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#a3b3bc' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      borderColor: '#334155', 
                      color: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="modern-card animate-slide-in delay-200">
          <div className="modern-card-header">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg md:text-xl font-semibold text-white">Recent Activity</h2>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-blue-300/70">Latest order transactions</p>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="oms-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/30">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-blue-900/10">
                      <td className="text-sm font-medium text-gray-200 truncate max-w-[80px] md:max-w-none">
                        <Link to="/orders" className="hover:text-blue-400 transition-colors">
                          {order.id}
                        </Link>
                      </td>
                      <td className="text-sm text-gray-300 truncate max-w-[80px] md:max-w-none">
                        {order.customerName}
                      </td>
                      <td className="text-sm">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="text-sm font-medium text-gray-200">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-right p-4">
              <Link to="/orders" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors inline-flex items-center">
                View All Orders 
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 rotate-45" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <BackgroundBeams className="opacity-10" />
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'shipped':
        return 'status-badge status-shipped';
      case 'delivered':
        return 'status-badge status-delivered';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge status-pending';
    }
  };

  return (
    <span className={getStatusStyles()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const StatCard = ({ title, value, icon, color, borderColor, highlight, path, trend }: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode; 
  color: string;
  borderColor: string;
  highlight: string;
  path: string;
  trend: number;
}) => {
  const trendColor = trend >= 0 ? "text-green-400" : "text-red-400";
  const trendIcon = trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-180" />;

  return (
    <Link to={path} className="block group">
      <div className={`modern-stat-card glow ${borderColor}`}>
        <div className={`h-1 ${highlight}`}></div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-blue-300 mb-1">{title}</h3>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
            <div className={`rounded-lg p-3 bg-gradient-to-br ${color}`}>
              {icon}
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className={`flex items-center gap-1 ${trendColor}`}>
              {trendIcon}
              {Math.abs(trend)}%
            </span>
            <span className="ml-2 text-gray-400">vs last month</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
