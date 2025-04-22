import axios from 'axios';

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
    return Promise.reject(error);
  }
);

export default axiosInstance;
