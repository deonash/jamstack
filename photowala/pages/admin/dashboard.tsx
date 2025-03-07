import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Container, Typography, Button, Box } from '@mui/material';

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.replace('/login');
    }
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ 
        background: 'linear-gradient(to right, #9333ea, #3b82f6)',
        py: 2
      }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ color: 'white' }}>
              📸 PhotoWala Admin
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: 'white' }}>{user?.email}</Typography>
              <Button 
                variant="contained"
                onClick={handleLogout}
                sx={{ 
                  bgcolor: 'white',
                  color: 'purple',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Admin Dashboard</Typography>
      </Container>
    </Box>
  );
} 