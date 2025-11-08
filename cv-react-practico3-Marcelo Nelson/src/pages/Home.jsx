import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  // useState para manejar el saludo
  const [greeting, setGreeting] = useState('');
  const { isAuthenticated } = useAuth();

  // useEffect para determinar el saludo según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Buenos días');
    } else if (hour < 18) {
      setGreeting('Buenas tardes');
    } else {
      setGreeting('Buenas noches');
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {greeting} 👋
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom color="text.secondary">
          Bienvenido a mi Currículum Vitae
        </Typography>
        <Typography variant="body1" paragraph sx={{ mt: 3, fontSize: '1.1rem' }}>
          Soy <strong>Marcelo Nelson</strong>, desarrollador backend junior especializado en Golang.
          Estudiante de 3er año de Ingeniería en Sistemas apasionado por crear soluciones escalables.
        </Typography>

        <Box sx={{ mt: 5, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/curriculum"
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
          >
            Ver mi CV
          </Button>
          <Button
            component={Link}
            to="/contact"
            variant="outlined"
            size="large"
            startIcon={<ContactMailIcon />}
          >
            Contactarme
          </Button>

          {/* Renderizado condicional: mostrar botón de login solo si NO está autenticado */}
          {!isAuthenticated && (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              startIcon={<LoginIcon />}
            >
              Acceder
            </Button>
          )}
        </Box>

        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                💻 Tecnologías
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Go, React, MySQL, Git, Linux, Clean Architecture
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                📍 Ubicación
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Córdoba, Argentina
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                📚 Estudiante
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingeniería en Sistemas - UCC
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
