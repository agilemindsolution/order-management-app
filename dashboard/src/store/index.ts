
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import customerReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    customers: customerReducer,
    products: productReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
