
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerState {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
}

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    address: '123 Main St, New York, NY 10001'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Beverly Hills, CA 90210'
  },
  {
    id: 'CUST-003',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    phone: '555-456-7890',
    address: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'CUST-004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '555-789-0123',
    address: '321 Elm St, Boston, MA 02108'
  }
];

const initialState: CustomerState = {
  customers: mockCustomers,
  isLoading: false,
  error: null
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(customer => customer.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
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
  setCustomers, 
  addCustomer, 
  updateCustomer, 
  deleteCustomer, 
  setLoading, 
  setError 
} = customerSlice.actions;

export default customerSlice.reducer;
