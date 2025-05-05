const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// export const API_ROUTES = {
//     getClients: `${BASE_URL}/clients`,
//     upsertClient: `${BASE_URL}/clients`,
//     deleteClient: `${BASE_URL}/clients`,
//     getProducts: `${BASE_URL}/products`,
//     getOrders: `${BASE_URL}/orders`,
//     // Add more routes here as needed
//   };

  export const API_ROUTES = {
    // Auth
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    registerAdmin: `${BASE_URL}/auth/register-admin`,
    // registerUser: '/api/auth/register-user',
    forgotPassword: `${BASE_URL}/auth/forgot-password`,
    getFactories: `${BASE_URL}/factories`,

    // Clients
    clients: `${BASE_URL}/clients`,
    clientById: (id: any) => `${BASE_URL}/clients/${id}`,
  
    // Products
    products: `${BASE_URL}/products`,
    productById: (id: any) => `${BASE_URL}/products/${id}`,
  
    // Orders
    orders: `${BASE_URL}/orders`,
    orderById: (id: any) => `${BASE_URL}/orders/${id}`,
  };