import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Prevent routing if we're already navigating
    if (router.pathname !== '/') return;

    // Always check authentication first
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Only redirect if we have a valid user and role
    if (user?.role) {
      switch (user.role) {
        case 'studio':
          router.replace('/studio/upload');
          break;
        case 'guest':
          router.replace('/guest/selfie');
          break;
        default:
          router.replace('/login');
      }
    }
  }, [isAuthenticated, user, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
} 