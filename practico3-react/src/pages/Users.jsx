import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import { userService } from '../services/api';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';

const Users = () => {
  // useState para manejar el estado de los usuarios, carga y errores
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar usuarios cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamada HTTP usando el servicio con axios
        const response = await userService.getAll();
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios. Por favor intenta nuevamente.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Array vacío significa que solo se ejecuta al montar el componente

  // Renderizado condicional: mostrando loading
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  // Renderizado condicional: mostrando error
  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Lista de Usuarios
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Datos obtenidos de JSONPlaceholder API - Esta es una ruta protegida que requiere autenticación
        </Typography>

        {/* Renderizado condicional: verificar si hay usuarios */}
        {users.length === 0 ? (
          <Alert severity="info">No se encontraron usuarios.</Alert>
        ) : (
          <>
            <Chip
              label={`Total de usuarios: ${users.length}`}
              color="primary"
              sx={{ mb: 3 }}
            />

            {/* Renderizado en loop usando map() */}
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid item xs={12} md={6} lg={4} key={user.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <PersonIcon />
                        </Avatar>
                        <Typography variant="h6" component="h2">
                          {user.name}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {user.phone}
                          </Typography>
                        </Box>

                        {/* Renderizado condicional: mostrar empresa si existe */}
                        {user.company && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BusinessIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {user.company.name}
                            </Typography>
                          </Box>
                        )}

                        {/* Renderizado condicional: mostrar website si existe */}
                        {user.website && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LanguageIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {user.website}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Users;
