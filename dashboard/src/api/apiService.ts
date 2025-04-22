import axios from './axiosInstance';

const apiService = {
  get: (url: string, params = {}) => axios.get(url, { params }),

  post: (url: string, data: any) => axios.post(url, data),

  put: (url: string, data: any) => axios.put(url, data),

  delete: (url: string) => axios.delete(url),
};

export default apiService;
