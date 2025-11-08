import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const success = await login(data.username, data.password);

      if (success) {
        navigate('/notes');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="login-container">
        <Paper elevation={3} className="login-paper">
          <Box className="login-header">
            <Box className="login-icon">
              <LockIcon fontSize="large" />
            </Box>
            <Typography component="h1" variant="h4" className="login-title">
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" className="login-subtitle">
              Sistema de Notas
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="login-error">
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="login-form"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              autoComplete="username"
              autoFocus
              {...register('username', {
                required: 'El usuario es requerido',
                minLength: {
                  value: 3,
                  message: 'El usuario debe tener al menos 3 caracteres',
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Iniciar Sesión'
              )}
            </Button>

            <Box className="login-credentials-box">
              <Typography variant="body2" className="credentials-title">
                <strong>Usuarios de prueba:</strong>
              </Typography>
              <Typography variant="body2" className="credentials-item">
                • Usuario: <code>admin</code> | Contraseña: <code>admin123</code>
              </Typography>
              <Typography variant="body2" className="credentials-item">
                • Usuario: <code>user</code> | Contraseña: <code>user123</code>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
