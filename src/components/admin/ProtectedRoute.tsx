import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, adminUser, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('demo') === 'true') {
      sessionStorage.setItem('np_demo', 'true');
    }
  }, []);

  const isDemoMode = new URLSearchParams(window.location.search).get('demo') === 'true'
    || sessionStorage.getItem('np_demo') === 'true';

  if (isDemoMode) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!adminUser.is_active) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
