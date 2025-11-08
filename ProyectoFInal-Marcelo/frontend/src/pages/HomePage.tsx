import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import {
  NoteAdd as NoteIcon,
  Category as CategoryIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <Container maxWidth="lg">
        <Box className="home-hero">
          <Typography variant="h2" component="h1" className="home-title">
            Sistema de Gestión de Notas
          </Typography>
          <Typography variant="h5" className="home-subtitle">
            Organiza tus ideas con notas y categorías
          </Typography>
          <Box className="home-actions">
            {isAuthenticated ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/notes')}
                className="home-button-primary"
              >
                Ir a Mis Notas
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  className="home-button-primary"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/about')}
                  className="home-button-secondary"
                >
                  Conocer Más
                </Button>
              </>
            )}
          </Box>
        </Box>

        <Grid container spacing={4} className="home-features">
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="feature-card">
              <Box className="feature-icon">
                <NoteIcon fontSize="large" />
              </Box>
              <Typography variant="h6" className="feature-title">
                Crea Notas
              </Typography>
              <Typography variant="body2" className="feature-description">
                Crea, edita y elimina notas de manera sencilla. Mantén todas tus ideas
                organizadas en un solo lugar.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="feature-card">
              <Box className="feature-icon">
                <CategoryIcon fontSize="large" />
              </Box>
              <Typography variant="h6" className="feature-title">
                Organiza con Categorías
              </Typography>
              <Typography variant="body2" className="feature-description">
                Asigna categorías de colores a tus notas y filtra por ellas para
                encontrar rápidamente lo que necesitas.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="feature-card">
              <Box className="feature-icon">
                <LoginIcon fontSize="large" />
              </Box>
              <Typography variant="h6" className="feature-title">
                Acceso Seguro
              </Typography>
              <Typography variant="body2" className="feature-description">
                Tus notas están protegidas con autenticación. Solo tú puedes acceder
                a tu información.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
