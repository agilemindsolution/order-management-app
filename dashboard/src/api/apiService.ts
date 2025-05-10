import axios from './axiosInstance';

const apiService = {
  get: (url: string, params = {}) => axios.get(url, { params }),

  post: (url: string, data: any, config = {}) => axios.post(url, data, config),

  put: (url: string, data: any, config = {}) => axios.put(url, data, config),

  delete: (url: string) => axios.delete(url),
};

export default apiService;
