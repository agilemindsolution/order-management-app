import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '@/api/apiService'; 
import { API_ROUTES } from '@/api/apiRoutes';

// Interfaces
export interface ProductImage {
  image_url: string;
  is_primary: boolean;
}

export interface Product {
  product_id: string;
  product_name: string;
  product_code?: string;
  category: string;
  sub_category?: string;
  brand?: string;
  packaging_size?: string;
  quality?: string;
  unit_of_measurement?: string;
  available_quantity: number;
  min_order_quantity?: number;
  price_per_unit: number;
  description?: string;
  images?: ProductImage[];
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

// Reusable handlers
const handlePending = (state: ProductState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: ProductState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_ROUTES.products);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_ROUTES.products, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_ROUTES.productById(id), data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.delete(API_ROUTES.productById(id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, handleRejected)

      // Add
      .addCase(addProduct.pending, handlePending)
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, handleRejected)

      // Update
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(p => p.product_id === action.payload.product_id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, handleRejected)

      // Delete
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(p => p.product_id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

// Selectors
export const selectProducts = (state: { products: ProductState }) => state.products.products;
export const selectProductLoading = (state: { products: ProductState }) => state.products.isLoading;
export const selectProductError = (state: { products: ProductState }) => state.products.error;

// Actions
export const { clearProductError } = productSlice.actions;

export default productSlice.reducer;
