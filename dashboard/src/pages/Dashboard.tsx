import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { fetchDashboardData } from '@/store/slices/dashboardSlice';
import {
  selectDashboardMetrics,
  selectDashboardStatus,
  selectDashboardRecentOrders,
  selectDashboardLoading
} from '@/store/slices/dashboardSlice';
import { Sparkles, PieChart, TrendingUp, ArrowUpRight } from 'lucide-react';
import { GridBackground } from '@/components/ui/grid-background';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Users, Package, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const metrics = useAppSelector(selectDashboardMetrics);
  const status = useAppSelector(selectDashboardStatus);
  const recentOrders = useAppSelector(selectDashboardRecentOrders);
  const isLoading = useAppSelector(selectDashboardLoading);

  const loadDashboardData = useCallback(async () => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched.current) {
      loadDashboardData();
      hasFetched.current = true;
    }
  }, [loadDashboardData]);

  const orderStatusData = [
    { name: 'Pending', value: status.pending, color: '#f59e0b' },
    { name: 'Shipped', value: status.shipped, color: '#3b82f6' },
    { name: 'Delivered', value: status.delivered, color: '#10b981' },
    { name: 'Cancelled', value: status.cancelled, color: '#ef4444' },
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
        <StatCard title="Total Orders" value={isLoading ? '—' : metrics.orderCount} icon={<ShoppingCart />} color="from-blue-600/20 to-blue-800/20" borderColor="border-blue-700/30" highlight="bg-blue-500" path="/dashboard/orders" trend={+5.2} />
        <StatCard title="Total Customers" value={isLoading ? '—' : metrics.clientCount} icon={<Users />} color="from-indigo-600/20 to-indigo-800/20" borderColor="border-indigo-700/30" highlight="bg-indigo-500" path="/dashboard/customers" trend={+2.5} />
        <StatCard title="Total Products" value={isLoading ? '—' : metrics.productCount} icon={<Package />} color="from-purple-600/20 to-purple-800/20" borderColor="border-purple-700/30" highlight="bg-purple-500" path="/dashboard/products" trend={+1.8} />
        <StatCard title="Total Revenue" value={isLoading ? '—' : `$${metrics.totalRevenue.toFixed(2)}`} icon={<CreditCard />} color="from-cyan-600/20 to-blue-700/20" borderColor="border-cyan-700/30" highlight="bg-cyan-500" path="/dashboard/orders" trend={+12.5} />
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
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
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
                  {recentOrders.map((order: any) => (
                    <tr key={order.order_id} className="hover:bg-blue-900/10">
                      <td className="text-sm font-medium text-gray-200 truncate max-w-[80px] md:max-w-none">
                        <Link to="/dashboard/orders" className="hover:text-blue-400 transition-colors">
                          {order.order_id}
                        </Link>
                      </td>
                      <td className="text-sm text-gray-300 truncate max-w-[80px] md:max-w-none">
                        {order.client_name}
                      </td>
                      <td className="text-sm">
                        <StatusBadge status={order.shipping_status} />
                      </td>
                      <td className="text-sm font-medium text-gray-200">
                        ${Number(order.total_amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-right p-4">
              <Link to="/dashboard/orders" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors inline-flex items-center">
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
      case 'pending': return 'status-badge status-pending';
      case 'shipped': return 'status-badge status-shipped';
      case 'delivered': return 'status-badge status-delivered';
      case 'cancelled': return 'status-badge status-cancelled';
      default: return 'status-badge';
    }
  };
  const displayText = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : 'Unknown';

  return <span className={getStatusStyles()}>{displayText}</span>;
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
            <div className={`rounded-lg p-3 bg-gradient-to-br ${color}`}>{icon}</div>
          </div>
          <div className="mt-4 flex items-center text-xs">
            <span className={`flex items-center gap-1 ${trendColor}`}>{trendIcon}{Math.abs(trend)}%</span>
            <span className="ml-2 text-gray-400">vs last month</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
