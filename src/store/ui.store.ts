import { create } from 'zustand';

export interface UIState {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  loading: Record<string, boolean>;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
}

export interface UIActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setLoading: (key: string, loading: boolean) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // State
  sidebarCollapsed: false,
  activeModal: null,
  loading: {},
  notifications: [],

  // Actions
  toggleSidebar: () => {
    set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  openModal: (modalId: string) => {
    set({ activeModal: modalId });
  },

  closeModal: () => {
    set({ activeModal: null });
  },

  setLoading: (key: string, loading: boolean) => {
    set(state => ({
      loading: {
        ...state.loading,
        [key]: loading
      }
    }));
  },

  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const timestamp = Date.now();
    
    set(state => ({
      notifications: [
        ...state.notifications,
        { ...notification, id, timestamp }
      ]
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id: string) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
}));