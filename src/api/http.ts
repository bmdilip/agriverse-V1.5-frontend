import axios from 'axios';
import toast from 'react-hot-toast';
import { mockNFTs, mockCertificates, mockUsers, mockAdminStats } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.agriverse.io';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_BASE_URL;

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
    // If using mock data and no real API, don't show network errors
    if (USE_MOCK_DATA && !error.response) {
      console.log('Mock data mode - API call intercepted');
      return Promise.reject(error);
    }

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
      // Only show network error if not in mock mode
      if (!USE_MOCK_DATA) {
        toast.error('Network error - Please check your connection');
      }
    }
    
    return Promise.reject(error);
  }
);

// Mock API helper
export const createMockResponse = (data: any, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};

// Export mock data for use in API clients
export { mockNFTs, mockCertificates, mockUsers, mockAdminStats, USE_MOCK_DATA };

export default httpClient;