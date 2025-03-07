import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Container, Box, Typography, Button } from '@mui/material';

export default function GuestSelfie() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'guest') {
      router.replace('/login');
    }
  }, [isAuthenticated, user]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera');
    }
  };

  const takeSelfie = () => {
    if (!videoRef.current || !isStreaming) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);

    // Here you would typically send the image data to your server
    const imageData = canvas.toDataURL('image/jpeg');
    // Handle the image data (e.g., upload to server)
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Stop the camera if it's running
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
        }
        // Force redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
              📸 PhotoWala Guest
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
        <Typography variant="h4" sx={{ mb: 4 }}>Take Your Selfie</Typography>
        
        <Box sx={{ 
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: 3,
          p: 3
        }}>
          <Box sx={{ mb: 3 }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {!isStreaming ? (
              <Button
                variant="contained"
                onClick={startCamera}
                sx={{ 
                  background: 'linear-gradient(to right, #9333ea, #3b82f6)',
                  '&:hover': { opacity: 0.9 }
                }}
              >
                Start Camera
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={takeSelfie}
                sx={{ 
                  background: 'linear-gradient(to right, #9333ea, #3b82f6)',
                  '&:hover': { opacity: 0.9 }
                }}
              >
                Take Selfie
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export function GuestHome() {
  return (
    <Container>
      <Typography variant="h4">Welcome to the Guest Selfie Page</Typography>
    </Container>
  );
} 