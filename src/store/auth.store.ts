import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userApi } from '../api/user';

export interface AuthState {
  isConnected: boolean;
  address: string | null;
  token: string | null;
  user: any | null;
  role: 'user' | 'admin' | 'superadmin' | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  connectWallet: (address: string, signature: string, message: string) => Promise<void>;
  disconnect: () => void;
  setUser: (user: any) => void;
  setRole: (role: string) => void;
  clearError: () => void;
  // Admin Preview mode
  enableAdminPreview: (role: 'admin' | 'superadmin') => void;
  // Demo mode
  enableDemoMode: (role?: 'user' | 'admin' | 'superadmin') => void;
  isDemoMode: () => boolean;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      isConnected: false,
      address: null,
      token: null,
      user: null,
      role: null,
      isLoading: false,
      error: null,

      // Actions
      connectWallet: async (address: string, signature: string, message: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await userApi.connect({ address, signature, message });
          const { token, user } = response;
          
          // Store token in localStorage for axios interceptor
          localStorage.setItem('agriverse_token', token);
          
          set({
            isConnected: true,
            address,
            token,
            user,
            role: user.role,
            isLoading: false,
            error: null
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Failed to connect wallet'
          });
          throw error;
        }
      },

      disconnect: () => {
        localStorage.removeItem('agriverse_token');
        set({
          isConnected: false,
          address: null,
          token: null,
          user: null,
          role: null,
          error: null
        });
      },

      setUser: (user: any) => {
        set({ user, role: user.role });
      },

      setRole: (role: string) => {
        set({ role: role as any });
      },

      clearError: () => {
        set({ error: null });
      },

      // Admin Preview mode (bypass wallet for testing)
      enableAdminPreview: (role: 'admin' | 'superadmin') => {
        const isPreviewMode = import.meta.env.VITE_ADMIN_PREVIEW === 'true';
        if (!isPreviewMode) return;

        const mockAddress = role === 'admin' 
          ? import.meta.env.VITE_MOCK_ADMIN_ADDRESS 
          : import.meta.env.VITE_MOCK_SUPERADMIN_ADDRESS;

        set({
          isConnected: true,
          address: mockAddress,
          token: 'preview-token-' + Math.random().toString(36).substr(2, 9),
          user: {
            id: 'preview-user',
            address: mockAddress,
            role,
            profile: { name: `Preview ${role}` }
          },
          role,
          error: null
        });
      },

      // Demo mode (bypass wallet for all dashboards)
      enableDemoMode: (role: 'user' | 'admin' | 'superadmin' = 'user') => {
        const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
        if (!isDemoMode) return;

        const mockAddress = role === 'admin' 
          ? import.meta.env.VITE_MOCK_ADMIN_ADDRESS 
          : role === 'superadmin'
            ? import.meta.env.VITE_MOCK_SUPERADMIN_ADDRESS
            : import.meta.env.VITE_MOCK_USER_ADDRESS;

        set({
          isConnected: true,
          address: mockAddress,
          token: 'demo-token-' + Math.random().toString(36).substr(2, 9),
          user: {
            id: 'demo-user',
            address: mockAddress,
            role,
            profile: { name: `Demo ${role}` }
          },
          role,
          error: null
        });
      },

      // Check if in demo mode
      isDemoMode: () => {
        const state = get();
        return import.meta.env.VITE_DEMO_MODE === 'true' && 
               state.token?.startsWith('demo-token');
      }
    }),
    {
      name: 'agriverse-auth',
      partialize: (state) => ({
        isConnected: state.isConnected,
        address: state.address,
        token: state.token,
        user: state.user,
        role: state.role
      })
    }
  )
);