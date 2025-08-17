import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { PermissionSlug, RBACContext } from '../types/rbac';

// Default permissions for each role
const DEFAULT_PERMISSIONS = {
  superadmin: [
    'approve_project',
    'reject_project',
    'manage_contracts',
    'manage_admins',
    'view_reports',
    'manage_kyc',
    'force_logout',
    'update_settings',
    'view_audit_logs',
    'manage_users',
    'deploy_contracts',
    'emergency_controls',
    'financial_reports',
    'security_oversight'
  ],
  admin: [
    'approve_project',
    'reject_project',
    'view_reports',
    'manage_kyc',
    'view_audit_logs'
  ],
  user: []
};

export const useRBAC = (): RBACContext => {
  const { user, role } = useAuth();

  const permissions = useMemo(() => {
    if (!user || !role) return [];
    
    // Get default permissions for role
    const defaultPerms = DEFAULT_PERMISSIONS[role] || [];
    
    // Merge with user-specific permissions (if any)
    const userPerms = user.permissions || [];
    
    return [...new Set([...defaultPerms, ...userPerms])];
  }, [user, role]);

  const can = (permission: PermissionSlug): boolean => {
    if (!user || !role) return false;
    
    // SuperAdmin has all permissions
    if (role === 'superadmin') return true;
    
    // Check if user has specific permission
    return permissions.includes(permission);
  };

  const hasRole = (requiredRole: string | string[]): boolean => {
    if (!role) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    
    return role === requiredRole;
  };

  return {
    user,
    permissions,
    can,
    hasRole
  };
};