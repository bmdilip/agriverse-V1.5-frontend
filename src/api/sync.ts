import httpClient from './http';
import { USE_MOCK_DATA, createMockResponse } from './http';

export interface DashboardSync {
  userId: string;
  lastSync: string;
  data: Record<string, any>;
}

export interface SyncUpdate {
  type: 'role_update' | 'project_approval' | 'kyc_status' | 'contract_status' | 'admin_action';
  userId: string | 'all';
  metadata: Record<string, any>;
  timestamp: string;
}

export const syncApi = {
  // Sync dashboard data across all user interfaces
  syncDashboard: async (userId: string) => {
    if (USE_MOCK_DATA) {
      console.log('🔄 Dashboard sync triggered for user:', userId);
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
        data: {
          pendingNotifications: 2,
          lastActivity: new Date(Date.now() - 3600000).toISOString()
        }
      });
    }

    const response = await httpClient.get(`/api/sync/status/${userId}`);
    return response.data;
  },

  // Trigger real-time update across dashboards
  triggerUpdate: async (data: {
    type: SyncUpdate['type'];
    userId: string | 'all';
    metadata: Record<string, any>;
  }) => {
    if (USE_MOCK_DATA) {
      console.log('🔄 Sync update triggered:', data);
      
      // Simulate real-time update propagation
      const updateData: SyncUpdate = {
        ...data,
        timestamp: new Date().toISOString()
      };
      
      // In a real implementation, this would use WebSockets or Server-Sent Events
      // to push updates to connected clients
      window.dispatchEvent(new CustomEvent('dashboardSync', { detail: updateData }));
      
      return createMockResponse({ success: true, propagated: true });
    }

    const response = await httpClient.post('/api/sync/trigger', data);
    return response.data;
  },

  // Sync all dashboards (emergency sync)
  syncAll: async () => {
    if (USE_MOCK_DATA) {
      console.log('🔄 Emergency sync triggered for all dashboards');
      return createMockResponse({ 
        success: true, 
        synced: ['user', 'admin', 'superadmin'],
        timestamp: new Date().toISOString()
      });
    }

    const response = await httpClient.post('/api/sync/all');
    return response.data;
  },

  // Get sync events (for debugging)
  getSyncEvents: async (params?: {
    limit?: number;
    type?: string;
    userId?: string;
  }) => {
    if (USE_MOCK_DATA) {
      return createMockResponse([
        {
          id: '1',
          type: 'role_update',
          userId: 'user1',
          metadata: { newRole: 'admin' },
          timestamp: new Date().toISOString(),
          processed: true
        },
        {
          id: '2',
          type: 'project_approval',
          userId: 'all',
          metadata: { projectId: 'BATCH-001', status: 'approved' },
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          processed: true
        }
      ]);
    }

    const response = await httpClient.get('/api/sync/events', { params });
    return response.data;
  }
};