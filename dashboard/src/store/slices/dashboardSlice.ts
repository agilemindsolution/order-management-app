import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit';
import apiService from '@/api/apiService';
import { API_ROUTES } from '@/api/apiRoutes';

interface DashboardMetrics {
  orderCount: number;
  clientCount: number;
  productCount: number;
  totalRevenue: number;
}

interface OrderStatusSummary {
  pending: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

interface DashboardState {
 metrics: DashboardMetrics;
  status: OrderStatusSummary;
  recentOrders: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: {
    orderCount: 0,
    clientCount: 0,
    productCount: 0,
    totalRevenue: 0,
  },
  status: {
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  },
  recentOrders: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: DashboardState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: DashboardState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const [metricsRes, statusRes, recentRes] = await Promise.all([
        apiService.get(API_ROUTES.dashboard.metrics),
        apiService.get(API_ROUTES.dashboard.status),
        apiService.get(API_ROUTES.dashboard.recent),
      ]);

      return {
        metrics: metricsRes.data,
        status: statusRes.data,
        recentOrders: recentRes.data,
      };
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch dashboard data'
        );
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, handlePending)
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.metrics = action.payload.metrics;
        state.status = action.payload.status;
        state.recentOrders = action.payload.recentOrders;
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, handleRejected);
  },
});

// Selectors
export const selectDashboardMetrics = (state: { dashboard: DashboardState }) =>
  state.dashboard.metrics;
export const selectDashboardStatus = (state: { dashboard: DashboardState }) =>
  state.dashboard.status;
export const selectDashboardRecentOrders = (state: { dashboard: DashboardState }) =>
  state.dashboard.recentOrders;
export const selectDashboardLoading = (state: { dashboard: DashboardState }) =>
  state.dashboard.isLoading;
export const selectDashboardError = (state: { dashboard: DashboardState }) =>
  state.dashboard.error;

// Export
export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
