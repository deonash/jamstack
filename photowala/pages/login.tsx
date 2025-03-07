import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Paper, Typography, Box, Container } from '@mui/material';
import { Alert } from '@mui/material';

export default function Login() {
  const auth = useAuth(); // Get the entire auth object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Use auth.login instead of destructured login
      await auth.login(data.token, data.user);

      // Handle redirect
      const redirects = {
        'studio': '/studio/upload',
        'guest': '/guest/selfie',
        'admin': '/admin/dashboard'
      };

      const path = redirects[data.user.role as keyof typeof redirects];
      if (path) {
        window.location.assign(path);
      }

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            PhotoWala
          </Typography>
          
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
            Use: studio@example.com / password123
            <br />
            or: guest@example.com / password123
            <br />
            or: admin@example.com / password123
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}