
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

// Mock data for products
const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 1200,
    stock: 10,
    category: 'Electronics'
  },
  {
    id: 'PROD-002',
    name: 'Smartphone',
    description: 'Latest smartphone with 128GB storage and dual camera',
    price: 800,
    stock: 15,
    category: 'Electronics'
  },
  {
    id: 'PROD-003',
    name: 'Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 100,
    stock: 30,
    category: 'Audio'
  },
  {
    id: 'PROD-004',
    name: 'Tablet',
    description: '10-inch tablet with 64GB storage',
    price: 500,
    stock: 8,
    category: 'Electronics'
  },
  {
    id: 'PROD-005',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 250,
    stock: 20,
    category: 'Wearables'
  }
];

const initialState: ProductState = {
  products: mockProducts,
  isLoading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
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
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  setLoading, 
  setError 
} = productSlice.actions;

export default productSlice.reducer;
