export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}
export interface Order {
  order_id: string;
  client_id: string;
  client_name: string;
  order_date: string;
  expected_delivery_date: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  courier_name?: string;
  tracking_number?: string;
  items: OrderItem[];
  shipping_status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  paymentMode: string;
  paymentType: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postalCode: string;
  city: string;
  state: string;
  mobileNumber: string;
  email: string;
  photo?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  total_amount: number;
}
