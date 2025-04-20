
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import customerReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    customers: customerReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
