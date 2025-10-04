export interface DashboardMetrics {
  orderCount: number;
  clientCount: number;
  productCount: number;
  totalRevenue: number;
}

export interface OrderStatusSummary {
  pending: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}
export interface DashboardData {
  metrics: DashboardMetrics;
  status: OrderStatusSummary;
  recentOrders: any[];
}
