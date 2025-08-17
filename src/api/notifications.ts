import httpClient from './http';
import { USE_MOCK_DATA, createMockResponse } from './http';

export interface Notification {
  id: string;
  userId: string;
  type: 'approval' | 'rejection' | 'update' | 'warning' | 'info';
  title: string;
  message: string;
  read: boolean;
  metadata: Record<string, any>;
  createdAt: string;
}

export interface SendNotificationRequest {
  userId: string;
  type: Notification['type'];
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

export const notificationsApi = {
  // Send notification to user
  send: async (data: SendNotificationRequest) => {
    if (USE_MOCK_DATA) {
      console.log('📧 Notification sent:', data);
      return createMockResponse({
        id: Math.random().toString(36).substr(2, 9),
        success: true,
        message: 'Notification sent successfully'
      });
    }

    const response = await httpClient.post('/api/notifications/send', data);
    return response.data;
  },

  // Send bulk notifications
  sendBulk: async (data: {
    userIds: string[];
    type: Notification['type'];
    title: string;
    message: string;
    metadata?: Record<string, any>;
  }) => {
    if (USE_MOCK_DATA) {
      console.log('📧 Bulk notifications sent:', data);
      return createMockResponse({
        success: true,
        sent: data.userIds.length,
        message: `${data.userIds.length} notifications sent`
      });
    }

    const response = await httpClient.post('/api/notifications/bulk', data);
    return response.data;
  },

  // Get user notifications
  getByUser: async (userId: string): Promise<Notification[]> => {
    if (USE_MOCK_DATA) {
      const mockData = [
        {
          id: '1',
          userId,
          type: 'approval' as const,
          title: 'Project Approved',
          message: 'Your project "Organic Wheat Farm" has been approved',
          read: false,
          metadata: { projectId: 'BATCH-001' },
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          userId,
          type: 'update' as const,
          title: 'Role Updated',
          message: 'Your role has been updated to admin',
          read: false,
          metadata: { newRole: 'admin' },
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ];
      return mockData;
    }

    const response = await httpClient.get(`/api/notifications/user/${userId}`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true });
    }

    const response = await httpClient.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async (userId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true, marked: 5 });
    }

    const response = await httpClient.put(`/api/notifications/user/${userId}/read-all`);
    return response.data;
  },

  // Get all notifications (admin only)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    userId?: string;
  }) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        notifications: [
          {
            id: '1',
            userId: 'user1',
            type: 'approval' as const,
            title: 'Project Approved',
            message: 'Project has been approved',
            read: false,
            metadata: {},
            createdAt: new Date().toISOString()
          }
        ],
        total: 1,
        page: 1,
        totalPages: 1
      });
    }

    const response = await httpClient.get('/api/notifications', { params });
    return response.data;
  },

  // Delete notification
  delete: async (notificationId: string) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({ success: true });
    }

    const response = await httpClient.delete(`/api/notifications/${notificationId}`);
    return response.data;
  }
};