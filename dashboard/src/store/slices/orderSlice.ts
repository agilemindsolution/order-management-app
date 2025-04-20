
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
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
  createdAt: string;
  updatedAt: string;
  total: number;
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  currentOrder: Order | null;
}

// Mock data for initial state
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    items: [
      {
        productId: 'PROD-001',
        productName: 'Laptop',
        quantity: 1,
        price: 1200,
        discount: 100,
        total: 1100
      }
    ],
    status: 'pending',
    paymentMode: 'Credit Card',
    paymentType: 'Full Payment',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    addressLine3: '',
    postalCode: '10001',
    city: 'New York',
    state: 'NY',
    mobileNumber: '555-123-4567',
    email: 'john.doe@example.com',
    createdAt: '2023-06-01T10:30:00.000Z',
    updatedAt: '2023-06-01T10:30:00.000Z',
    total: 1100
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    items: [
      {
        productId: 'PROD-002',
        productName: 'Smartphone',
        quantity: 2,
        price: 800,
        discount: 50,
        total: 1550
      }
    ],
    status: 'shipped',
    paymentMode: 'PayPal',
    paymentType: 'Installment',
    addressLine1: '456 Oak Ave',
    addressLine2: '',
    addressLine3: '',
    postalCode: '90210',
    city: 'Beverly Hills',
    state: 'CA',
    mobileNumber: '555-987-6543',
    email: 'jane.smith@example.com',
    createdAt: '2023-06-10T14:20:00.000Z',
    updatedAt: '2023-06-11T09:15:00.000Z',
    total: 1550
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-003',
    customerName: 'Robert Johnson',
    items: [
      {
        productId: 'PROD-003',
        productName: 'Headphones',
        quantity: 3,
        price: 100,
        discount: 15,
        total: 285
      }
    ],
    status: 'delivered',
    paymentMode: 'Bank Transfer',
    paymentType: 'Full Payment',
    addressLine1: '789 Pine St',
    addressLine2: 'Suite 101',
    addressLine3: 'Building A',
    postalCode: '60601',
    city: 'Chicago',
    state: 'IL',
    mobileNumber: '555-456-7890',
    email: 'robert.j@example.com',
    createdAt: '2023-06-15T08:45:00.000Z',
    updatedAt: '2023-06-18T11:30:00.000Z',
    total: 285
  },
  {
    id: 'ORD-004',
    customerId: 'CUST-004',
    customerName: 'Emily Davis',
    items: [
      {
        productId: 'PROD-004',
        productName: 'Tablet',
        quantity: 1,
        price: 500,
        discount: 0,
        total: 500
      }
    ],
    status: 'cancelled',
    paymentMode: 'Credit Card',
    paymentType: 'Full Payment',
    addressLine1: '321 Elm St',
    addressLine2: '',
    addressLine3: '',
    postalCode: '02108',
    city: 'Boston',
    state: 'MA',
    mobileNumber: '555-789-0123',
    email: 'emily.davis@example.com',
    createdAt: '2023-06-20T16:10:00.000Z',
    updatedAt: '2023-06-21T09:05:00.000Z',
    total: 500
  }
];

const initialState: OrderState = {
  orders: mockOrders,
  isLoading: false,
  error: null,
  currentOrder: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setOrders, 
  addOrder, 
  updateOrder, 
  deleteOrder, 
  setCurrentOrder, 
  setLoading, 
  setError 
} = orderSlice.actions;

export default orderSlice.reducer;
