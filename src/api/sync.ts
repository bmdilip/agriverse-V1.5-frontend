import httpClient from './http';
import { USE_MOCK_DATA, createMockResponse } from './http';

export interface DashboardSync {
  userId: string;
  lastSync: string;
  data: Record<string, any>;
}

export const syncApi = {
  // Sync dashboard data across all user interfaces
  syncDashboard: async (userId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        success: true,
        lastSync: new Date().toISOString(),
        data: {
          notifications: 3,
          pendingActions: 1,
          updates: ['role_updated', 'project_approved']
        }
      });
    }

    const response = await httpClient.post('/api/sync/dashboard', { userId });
    return response.data;
  },

  // Get sync status
  getSyncStatus: async (userId: string): Promise<DashboardSync> => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        userId,
        lastSync: new Date().toISOString(),
        data: {}
      });
    }

    const response = await httpClient.get(`/api/sync/status/${userId}`);
    return response.data;
  },

  // Trigger real-time update
  triggerUpdate: async (data: {
    type: 'role_update' | 'project_approval' | 'kyc_status';
    userId: string;
    metadata: Record<string, any>;
  }) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true });
    }

    const response = await httpClient.post('/api/sync/trigger', data);
    return response.data;
  }
};