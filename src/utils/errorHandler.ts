import toast from 'react-hot-toast';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: any): ApiError => {
  console.error('API Error:', error);

  // Network error
  if (!error.response) {
    return {
      message: 'Network error - Please check your connection',
      status: 0,
      code: 'NETWORK_ERROR'
    };
  }

  // HTTP error responses
  const { response } = error;
  const status = response.status;
  const message = response.data?.message || response.data?.error || 'An error occurred';

  switch (status) {
    case 400:
      return { message: `Bad request: ${message}`, status, code: 'BAD_REQUEST' };
    case 401:
      return { message: 'Unauthorized - Please connect your wallet', status, code: 'UNAUTHORIZED' };
    case 403:
      return { message: 'Access denied - Insufficient permissions', status, code: 'FORBIDDEN' };
    case 404:
      return { message: 'Resource not found', status, code: 'NOT_FOUND' };
    case 429:
      return { message: 'Too many requests - Please try again later', status, code: 'RATE_LIMITED' };
    case 500:
      return { message: 'Server error - Please try again later', status, code: 'SERVER_ERROR' };
    default:
      return { message, status, code: 'UNKNOWN_ERROR' };
  }
};

export const showErrorToast = (error: any) => {
  const apiError = handleApiError(error);
  toast.error(apiError.message);
  return apiError;
};

export const withErrorHandling = async <T>(
  apiCall: () => Promise<T>,
  fallbackData?: T
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    showErrorToast(error);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
};