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
import { PersonAdd as RegisterIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const success = await registerUser(data.username, data.email, data.password);

      if (success) {
        navigate('/notes');
      } else {
        setError('Error al crear la cuenta. Por favor intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al crear la cuenta. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="register-container">
        <Paper elevation={3} className="register-paper">
          <Box className="register-header">
            <Box className="register-icon">
              <RegisterIcon fontSize="large" />
            </Box>
            <Typography component="h1" variant="h4" className="register-title">
              Crear Cuenta
            </Typography>
            <Typography variant="body2" className="register-subtitle">
              Sistema de Notas
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="register-error">
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="register-form"
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
                maxLength: {
                  value: 100,
                  message: 'El usuario no puede tener más de 100 caracteres',
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
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

            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirmar Contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Debes confirmar la contraseña',
                validate: (value) =>
                  value === password || 'Las contraseñas no coinciden',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              className="register-button"
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Crear Cuenta'
              )}
            </Button>

            <Box className="register-links">
              <Typography variant="body2" className="register-link-text">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="register-link">
                  Inicia Sesión
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
