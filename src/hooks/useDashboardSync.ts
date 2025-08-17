import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { syncApi } from '../api/sync';
import { notificationsApi } from '../api/notifications';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export const useDashboardSync = () => {
  const queryClient = useQueryClient();
  const { user, address } = useAuth();

  // Handle sync events
  const handleSyncEvent = useCallback((event: CustomEvent) => {
    const { type, userId, metadata } = event.detail;
    
    console.log('🔄 Dashboard sync event received:', event.detail);
    
    // Invalidate relevant queries based on sync type
    switch (type) {
      case 'role_update':
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        queryClient.invalidateQueries({ queryKey: ['superadmin-users'] });
        queryClient.invalidateQueries({ queryKey: ['superadmin-admins'] });
        
        if (userId === user?.id || userId === address) {
          toast.info(`Your role has been updated to ${metadata.newRole}`);
          // Force re-authentication to get new permissions
          window.location.reload();
        }
        break;
        
      case 'project_approval':
        queryClient.invalidateQueries({ queryKey: ['marketplace'] });
        queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
        queryClient.invalidateQueries({ queryKey: ['superadmin-projects'] });
        queryClient.invalidateQueries({ queryKey: ['user-dashboard'] });
        
        if (metadata.status === 'approved') {
          toast.success(`Project ${metadata.projectId} has been approved!`);
        } else if (metadata.status === 'rejected') {
          toast.error(`Project ${metadata.projectId} has been rejected`);
        }
        break;
        
      case 'kyc_status':
        queryClient.invalidateQueries({ queryKey: ['kyc-status'] });
        queryClient.invalidateQueries({ queryKey: ['superadmin-kyc'] });
        
        if (userId === user?.id || userId === address) {
          if (metadata.status === 'approved') {
            toast.success('Your KYC has been approved!');
          } else if (metadata.status === 'rejected') {
            toast.error('Your KYC has been rejected');
          }
        }
        break;
        
      case 'contract_status':
        queryClient.invalidateQueries({ queryKey: ['superadmin-contracts'] });
        
        if (metadata.status === 'paused') {
          toast.warning(`Contract ${metadata.contractName} has been paused`);
        } else if (metadata.status === 'resumed') {
          toast.success(`Contract ${metadata.contractName} has been resumed`);
        }
        break;
        
      case 'admin_action':
        // Refresh all admin-related data
        queryClient.invalidateQueries({ queryKey: ['superadmin-dashboard'] });
        queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
        break;
        
      default:
        console.log('Unknown sync event type:', type);
    }
  }, [queryClient, user, address]);

  // Set up event listeners for real-time sync
  useEffect(() => {
    window.addEventListener('dashboardSync', handleSyncEvent as EventListener);
    
    return () => {
      window.removeEventListener('dashboardSync', handleSyncEvent as EventListener);
    };
  }, [handleSyncEvent]);

  // Trigger sync update
  const triggerSync = useCallback(async (data: {
    type: 'role_update' | 'project_approval' | 'kyc_status' | 'contract_status' | 'admin_action';
    userId: string | 'all';
    metadata: Record<string, any>;
  }) => {
    try {
      await syncApi.triggerUpdate(data);
    } catch (error) {
      console.error('Failed to trigger sync:', error);
    }
  }, []);

  // Send notification
  const sendNotification = useCallback(async (data: {
    userId: string;
    type: 'approval' | 'rejection' | 'update' | 'warning' | 'info';
    title: string;
    message: string;
    metadata?: Record<string, any>;
  }) => {
    try {
      await notificationsApi.send(data);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }, []);

  // Sync dashboard data
  const syncDashboard = useCallback(async (userId?: string) => {
    try {
      const targetUserId = userId || user?.id || address;
      if (targetUserId) {
        await syncApi.syncDashboard(targetUserId);
      }
    } catch (error) {
      console.error('Failed to sync dashboard:', error);
    }
  }, [user, address]);

  return {
    triggerSync,
    sendNotification,
    syncDashboard
  };
};