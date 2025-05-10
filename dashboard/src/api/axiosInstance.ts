import axios from 'axios';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Request interceptor (e.g., for auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor (e.g., for global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response || error?.message);
    const status = error.response?.status;
    const message = error.response?.data?.message || 'An unexpected error occurred';
    
    if (status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    } else if (status >= 400 && status < 500) {
      toast.error(message);
    } else {
      toast.error('Server error, please try again later.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
