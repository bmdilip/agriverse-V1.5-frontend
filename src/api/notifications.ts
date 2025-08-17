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
      return createMockResponse({
        id: Math.random().toString(36).substr(2, 9),
        success: true,
        message: 'Notification sent successfully'
      });
    }

    const response = await httpClient.post('/api/notifications/send', data);
    return response.data;
  },

  // Get user notifications
  getByUser: async (userId: string): Promise<Notification[]> => {
    if (USE_MOCK_DATA) {
      return createMockResponse([
        {
          id: '1',
          userId,
          type: 'approval' as const,
          title: 'Project Approved',
          message: 'Your project "Organic Wheat Farm" has been approved',
          read: false,
          metadata: { projectId: 'BATCH-001' },
          createdAt: new Date().toISOString()
        }
      ]);
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

  // Get all notifications (admin only)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    userId?: string;
  }) => {
    if (USE_MOCK_DATA) {
      return createMockResponse({
        notifications: [],
        total: 0,
        page: 1,
        totalPages: 1
      });
    }

    const response = await httpClient.get('/api/notifications', { params });
    return response.data;
  }
};