import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAdminGuard = (requiredRole: 'admin' | 'superadmin' = 'admin') => {
  const { isAuthenticated, role, isAdminPreview, isDemoMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Allow access if in admin preview mode or demo mode
    if (isAdminPreview || isDemoMode) {
      return;
    }

    // Check authentication and role
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }

    const hasAccess = 
      (requiredRole === 'admin' && (role === 'admin' || role === 'superadmin')) ||
      (requiredRole === 'superadmin' && role === 'superadmin');

    if (!hasAccess) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, role, requiredRole, navigate, isAdminPreview, isDemoMode]);

  return {
    hasAccess: isAdminPreview || isDemoMode || (isAuthenticated && (
      (requiredRole === 'admin' && (role === 'admin' || role === 'superadmin')) ||
      (requiredRole === 'superadmin' && role === 'superadmin')
    ))
  };
};