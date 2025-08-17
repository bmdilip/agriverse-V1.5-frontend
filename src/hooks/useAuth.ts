import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { userApi } from '../api/user';

export const useAuth = () => {
  const {
    isConnected,
    address,
    token,
    user,
    role,
    isLoading,
    error,
    connectWallet,
    disconnect,
    setUser,
    clearError,
    enableAdminPreview
  } = useAuthStore();

  // Check if user has specific role
  const hasRole = (requiredRole: string | string[]) => {
    if (!role) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    return role === requiredRole;
  };

  // Check if admin preview mode is enabled
  const isAdminPreview = () => {
    return import.meta.env.VITE_ADMIN_PREVIEW === 'true' && token === 'preview-token';
  };

  // Connect wallet with MetaMask
  const connectMetaMask = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      
      // Create signature message
      const message = `Sign this message to authenticate with Agriverse: ${Date.now()}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address]
      });

      await connectWallet(address, signature, message);
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!address) return;
    
    try {
      const userData = await userApi.getProfile(address);
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  // Auto-refresh user data when address changes
  useEffect(() => {
    if (address && token && token !== 'preview-token') {
      refreshUser();
    }
  }, [address, token]);

  return {
    // State
    isConnected,
    address,
    token,
    user,
    role,
    isLoading,
    error,
    
    // Computed
    isAuthenticated: isConnected && !!token,
    isAdmin: hasRole(['admin', 'superadmin']),
    isSuperAdmin: hasRole('superadmin'),
    isAdminPreview: isAdminPreview(),
    
    // Actions
    connectMetaMask,
    disconnect,
    refreshUser,
    hasRole,
    clearError,
    enableAdminPreview
  };
};