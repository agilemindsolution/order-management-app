import pool from '../config/db';

export interface Order {
  order_id: number;
  client_id: number;
  order_date: Date;
  expected_delivery_date?: Date;
  shipping_date?: Date;
  courier_name?: string;
  tracking_number?: string;
  shipping_status?: string;
  total_amount?: number;
  payment_status?: string;
  gst_number?: string;
  pan_number?: string;
  created_by?: string;
  created_at?: Date;
  updated_by?: string;
  updated_at?: Date;
  last_notification_sent?: Date;
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  packaging_size?: string;
  quality?: string;
  created_by?: string;
  created_at?: Date;
}

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
  const { rows } = await pool.query(
    'INSERT INTO orders (client_id, order_date, expected_delivery_date, shipping_date, courier_name, tracking_number, shipping_status, total_amount, payment_status, gst_number, pan_number, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
    [orderData.client_id, orderData.order_date, orderData.expected_delivery_date, orderData.shipping_date, orderData.courier_name, orderData.tracking_number, orderData.shipping_status, orderData.total_amount, orderData.payment_status, orderData.gst_number, orderData.pan_number, orderData.created_by, orderData.updated_by]
  );
  return rows[0];
};

export const getOrders = async (): Promise<Order[]> => {
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return rows;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
  return rows[0];
};

export const updateOrderById = async (id: string, orderData: Partial<Order>): Promise<Order> => {
  const fields = Object.keys(orderData).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = Object.values(orderData);
  const { rows } = await pool.query(`UPDATE orders SET ${fields} WHERE order_id = $1 RETURNING *`, [id, ...values]);
  return rows[0];
};

export const deleteOrderById = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM orders WHERE order_id = $1', [id]);
};
