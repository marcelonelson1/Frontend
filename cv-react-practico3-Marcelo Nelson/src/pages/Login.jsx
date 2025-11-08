import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Box, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const onSubmit = (data) => {
    const success = login(data.email, data.password);

    if (success) {
      setLoginError('');
      navigate('/curriculum');
    } else {
      setLoginError('Email o contraseña incorrectos');
    }
  };

  return (
    <Box className="login-container">
      <Paper elevation={10} className="login-paper">
        <Typography variant="h4" component="h1" gutterBottom className="login-title">
          Iniciar Sesión
        </Typography>

        <Typography variant="body2" className="login-subtitle">
          Ingresa con cualquier email y contraseña
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 4,
                message: 'La contraseña debe tener al menos 4 caracteres'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            className="login-submit-button"
          >
            Ingresar
          </Button>
        </form>

        <Typography variant="caption" display="block" className="login-tip">
          Tip: Usa demo@test.com / 1234
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
