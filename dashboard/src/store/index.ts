
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import customerReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    customers: customerReducer,
    products: productReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
