import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl || 'http://localhost:5000/api';

export const API_ROUTES = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  registerAdmin: '/auth/register-admin',
  forgotPassword: '/auth/forgot-password',
  getFactories: '/factories',

  // Clients
  clients: '/clients',
  clientById: (id: any) => `/clients/${id}`,

  // Products
  products: '/products',
  productById: (id: any) => `/products/${id}`,

  // Orders
  orders: '/orders',
  orderById: (id: any) => `/orders/${id}`,

  dashboard: {
    metrics: '/dashboard/metrics',
    status: '/dashboard/status',
    recent: '/dashboard/recent',
  },
};
