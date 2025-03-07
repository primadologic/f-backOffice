import React from 'react';

import { Navigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    Cookies.remove('refresh')
    Cookies.remove('access')
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};