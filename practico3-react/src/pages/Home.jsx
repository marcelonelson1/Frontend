import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [greeting, setGreeting] = useState('');

  // useEffect para determinar el saludo según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Buenos días');
    } else if (hour < 20) {
      setGreeting('Buenas tardes');
    } else {
      setGreeting('Buenas noches');
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {greeting}{isAuthenticated && `, ${user?.name}`}
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
          Bienvenido a mi CV Digital - Práctico 3 React
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="body1" paragraph>
            Esta es una aplicación web desarrollada con React que cumple con todos los requisitos del Práctico 3:
          </Typography>
          <ul style={{ lineHeight: 2 }}>
            <li>✓ Uso de <strong>useState</strong> para manejo de estado local</li>
            <li>✓ Uso de <strong>useEffect</strong> para efectos secundarios</li>
            <li>✓ Renderizado condicional con operadores JS</li>
            <li>✓ Renderizado en loop con map()</li>
            <li>✓ Rutas privadas y públicas con React Router DOM</li>
            <li>✓ Context + hook + provider para manejo del login</li>
            <li>✓ Axios con interceptores HTTP</li>
            <li>✓ Componentes de Material UI</li>
            <li>✓ React Hook Form para formularios</li>
            <li>✓ Llamada HTTP a JSONPlaceholder API</li>
          </ul>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <WorkIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Mi Currículum
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Conoce mi experiencia laboral, educación y habilidades
              </Typography>
              <Button variant="contained" component={Link} to="/curriculum">
                Ver CV
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Usuarios
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {isAuthenticated
                  ? 'Listado de usuarios de la API (ruta protegida)'
                  : 'Inicia sesión para ver la lista de usuarios'}
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to={isAuthenticated ? "/users" : "/login"}
              >
                {isAuthenticated ? 'Ver Usuarios' : 'Iniciar Sesión'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ContactMailIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Contacto
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Envíame un mensaje usando el formulario de contacto
              </Typography>
              <Button variant="contained" component={Link} to="/contact">
                Contactar
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
