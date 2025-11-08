import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Si existe un token, agregarlo al header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    
    // Don't show toast for 404 errors on specific endpoints
    if (error.response?.status !== 404) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;