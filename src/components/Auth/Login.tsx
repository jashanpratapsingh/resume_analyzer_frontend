import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message);
      }
    } catch (err) {
      setError('Failed to sign in');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              mb: 4,
              background: 'linear-gradient(90deg, #60A5FA 0%, #F87171 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mb: 2,
                background: 'linear-gradient(90deg, #60A5FA 0%, #F87171 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #3B82F6 0%, #EF4444 100%)',
                },
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Typography align="center" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/signup" color="primary">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login; 