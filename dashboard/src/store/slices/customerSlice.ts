
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import apiService from '@/api/apiService';
import { API_ROUTES } from '@/api/apiRoutes';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ROUTES.clients);
      const mappedCustomers = response.data.map((client: any) => ({
        id: client.client_id, // or client.client_id if it's different
        name: client.client_name,
        email: client.email,
        phone: client.phone_number,
        alternate_phone: client.alternate_phone,
        address: client.address,
        city: client.city,
        contact_person: client.contact_person,
        country: client.country,
        state: client.state,
        pin_code:client.pin_code,
        gst_number:client.gst_number,
        pan_number:client.pan_number,
        website: client.website
      }));

      return mappedCustomers;
      // return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
  }
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customer: Customer, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ROUTES.clients, customer);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add customer');
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customer: Customer, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ROUTES.clientById(0), customer);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update customer');
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.delete(API_ROUTES.clientById(0));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete customer');
    }
  }
);

export interface Customer {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: any;
  alternate_phone: any;
  address: string;
  city: string;
  country: string;
  state: string;
  pin_code: any;
  gst_number: string;
  pan_number: string;
  website: string;
}

interface CustomerState {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  isLoading: false,
  error: null
};

// Reusable Handlers
const handlePending = (state: CustomerState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: CustomerState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // setCustomers: (state, action: PayloadAction<Customer[]>) => {
    //   state.customers = action.payload;
    // },
    // addCustomer: (state, action: PayloadAction<Customer>) => {
    //   state.customers.push(action.payload);
    // },
    // updateCustomer: (state, action: PayloadAction<Customer>) => {
    //   const index = state.customers.findIndex(customer => customer.id === action.payload.id);
    //   if (index !== -1) {
    //     state.customers[index] = action.payload;
    //   }
    // },
    // deleteCustomer: (state, action: PayloadAction<string>) => {
    //   state.customers = state.customers.filter(customer => customer.id !== action.payload);
    // },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      //get
      .addCase(fetchCustomers.pending, handlePending)
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.isLoading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, handleRejected)

       // Add
       .addCase(addCustomer.pending, handlePending)
       .addCase(addCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
         state.isLoading = false;
         state.customers.push(action.payload);
       })
       .addCase(addCustomer.rejected, handleRejected)
 
       // Update
       .addCase(updateCustomer.pending, handlePending)
       .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
         state.isLoading = false;
         const index = state.customers.findIndex(c => c.id === action.payload.id);
         if (index !== -1) {
           state.customers[index] = action.payload;
         }
       })
       .addCase(updateCustomer.rejected, handleRejected)
 
       // Delete
       .addCase(deleteCustomer.pending, handlePending)
       .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
         state.isLoading = false;
         state.customers = state.customers.filter(c => c.id !== action.payload);
       })
       .addCase(deleteCustomer.rejected, handleRejected);
  }
});

export const { 
  // setCustomers, 
  // addCustomer, 
  // updateCustomer, 
  // deleteCustomer, 
  setLoading, 
  setError 
} = customerSlice.actions;

export default customerSlice.reducer;
