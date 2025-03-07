import { useEffect } from 'react';

import { Navigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { useNavigate } from '@tanstack/react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

 

  const navigate = useNavigate();
  
  useEffect(() => {
    const access: string | undefined = Cookies.get('access');
    const refresh: string | undefined = Cookies.get('refresh');

    if (!access || !refresh) {
      navigate({ to: '/', reloadDocument: true });
    }
  }, [navigate]);
  


  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    Cookies.remove('refresh')
    Cookies.remove('access')
    return <Navigate to="/" reloadDocument={true} replace />;
  }

  return <>{children}</>;
};