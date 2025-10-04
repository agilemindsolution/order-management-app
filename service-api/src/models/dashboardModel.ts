import pool from "../config/db";

// Total counts and revenue
export const getDashboardCounts = async () => {
  console.log("next here:");
  const [orders, clients, products, revenue] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM orders"),
    pool.query("SELECT COUNT(*) FROM client_master"),
    pool.query("SELECT COUNT(*) FROM product_master"),
    pool.query("SELECT COALESCE(SUM(total_amount), 0) FROM orders"),
  ]);
  console.log("orders:", orders);

  return {
    orderCount: parseInt(orders.rows[0].count, 10),
    clientCount: parseInt(clients.rows[0].count, 10),
    productCount: parseInt(products.rows[0].count, 10),
    totalRevenue: parseFloat(revenue.rows[0].coalesce),
  };
};

// Orders grouped by status
export const getOrderStatusCounts = async () => {
  const result = await pool.query(`
    SELECT shipping_status, COUNT(*) as count
    FROM orders
    GROUP BY shipping_status;`);

  const statusCounts: Record<string, number> = {
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  result.rows.forEach((row: any) => {
    statusCounts[row.shipping_status] = parseInt(row.count, 10);
  });

  return statusCounts;
};

// Recent orders (top 5 by created date)
export const getRecentOrdersData = async () => {
  return pool.query(`
    SELECT o.order_id, cm.client_name, o.shipping_status, o.total_amount, o.created_at
    FROM orders o 
    left join client_master cm on cm.client_id =o.client_id
    ORDER BY o.created_at DESC
    LIMIT 5;`);
};
