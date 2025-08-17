import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.agriverse.io';

// Create axios instance
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('agriverse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case 400:
          toast.error(response.data?.message || 'Bad request');
          break;
        case 401:
          toast.error('Unauthorized - Please connect your wallet');
          localStorage.removeItem('agriverse_token');
          window.location.href = '/';
          break;
        case 403:
          toast.error('Access denied - Insufficient permissions');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error - Please try again later');
          break;
        default:
          toast.error(response.data?.message || 'An error occurred');
      }
    } else {
      toast.error('Network error - Please check your connection');
    }
    
    return Promise.reject(error);
  }
);

export default httpClient;