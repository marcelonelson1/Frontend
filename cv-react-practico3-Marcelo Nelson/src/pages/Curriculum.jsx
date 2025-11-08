import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import './Curriculum.css';

const Curriculum = () => {
  // useState para controlar la visibilidad de tags en proyectos
  const [mostrarTags, setMostrarTags] = useState(true);

  // useState para controlar el modo de vista (grid o list)
  const [modoVista, setModoVista] = useState('grid');

  // useState para el filtro de proyectos
  const [filtroActivo, setFiltroActivo] = useState('');

  // useState para proyectos (igual que en Angular)
  const [proyectos] = useState([
    {
      imagen: 'https://via.placeholder.com/300x200/667eea/ffffff?text=RMRenders',
      titulo: 'RMRenders - Plataforma de Cursos',
      descripcion: 'Aplicación web desarrollada desde cero en Go para la gestión y comercialización de cursos de renders 3D.',
      tags: ['go', 'mvc', 'jwt', 'mariadb']
    },
    {
      imagen: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Gimnasios',
      titulo: 'Sistema de Gestión de Gimnasios',
      descripcion: 'Sistema web creado con Go bajo patrón MVC, orientado a la administración integral de gimnasios.',
      tags: ['go', 'echo', 'mysql', 'gorm']
    },
    {
      imagen: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Hoteles',
      titulo: 'Sistema de Gestión de Hoteles',
      descripcion: 'Sistema web creado con Go bajo patrón MVC, orientado a la administración integral de hoteles.',
      tags: ['go', 'echo', 'mysql', 'gorm']
    }
  ]);

  // useState para educación
  const [educacion] = useState([
    {
      periodo: '2023 - Actualidad',
      titulo: 'Ingeniería en Sistemas',
      institucion: '3er año en la Universidad Católica de Córdoba'
    },
    {
      periodo: '2017 - 2022',
      titulo: 'Bachiller con Especialidad en Comunicación Social',
      institucion: 'Escuela Secundaria Costa Azul College'
    }
  ]);

  // useState para idiomas
  const [idiomas] = useState([
    { nombre: 'Español', nivel: 'Nativo' },
    { nombre: 'Inglés', nivel: 'Intermedio' },
    { nombre: 'Portugués', nivel: 'Intermedio' }
  ]);

  // useState para habilidades técnicas
  const [habilidadesTecnicas] = useState({
    lenguajes: ['Go (intermedio)', 'React (básico)', 'HTML', 'CSS'],
    frameworks: ['Echo', 'Gin', 'GORM'],
    baseDatos: ['MySQL', 'MariaDB'],
    herramientas: ['Git', 'GitHub', 'Linux', 'Clean Architecture', 'MVC', 'Redes', 'Ciberseguridad', 'GenAI Tools']
  });

  // useState para habilidades blandas
  const [habilidadesBlandas] = useState([
    'Pensamiento lógico y resolución de problemas',
    'Autonomía y capacidad de aprendizaje autodidacta',
    'Organización y manejo del tiempo',
    'Trabajo en equipo y colaboración interdisciplinaria',
    'Actitud proactiva y compromiso con la mejora continua'
  ]);

  // Función para filtrar proyectos (usando JS filter)
  const proyectosFiltrados = filtroActivo
    ? proyectos.filter(proyecto => proyecto.tags.includes(filtroActivo.toLowerCase()))
    : proyectos;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Avatar sx={{ width: 100, height: 100, fontSize: '2.5rem', bgcolor: 'white', color: '#667eea' }}>
              MN
            </Avatar>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Marcelo Nelson
              </Typography>
              <Typography variant="h6" gutterBottom>
                Desarrollador Backend Junior | Estudiante de Ingeniería en Sistemas
              </Typography>
              <Typography variant="body1">
                Estudiante de 3er año de Ingeniería en Sistemas y desarrollador backend junior con enfoque en Golang.
                Me interesa construir soluciones funcionales, bien estructuradas y orientadas a la escalabilidad.
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Contacto */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contacto
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon color="primary" />
                    <Typography variant="body2">+54 3513882695</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon color="primary" />
                    <Typography variant="body2">marcelinho.nelson@gmail.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="primary" />
                    <Typography variant="body2">Córdoba, Argentina</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GitHubIcon color="primary" />
                    <Typography variant="body2">
                      <a href="https://github.com/marcelonelson1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        github.com/marcelonelson1
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Idiomas - Renderizado con map() */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Idiomas
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {idiomas.map((idioma, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{idioma.nombre}</Typography>
                    <Chip label={idioma.nivel} size="small" color={idioma.nivel === 'Nativo' ? 'primary' : 'default'} />
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Habilidades Blandas - Renderizado con map() */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Habilidades Blandas
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {habilidadesBlandas.map((habilidad, index) => (
                    <li key={index}>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>{habilidad}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Educación - Renderizado con map() */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon /> Educación
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {educacion.map((edu, index) => (
                  <Box key={index} sx={{ mb: index < educacion.length - 1 ? 3 : 0 }}>
                    <Typography variant="subtitle2" color="primary">{edu.periodo}</Typography>
                    <Typography variant="h6">{edu.titulo}</Typography>
                    <Typography variant="body2" color="text.secondary">{edu.institucion}</Typography>
                    {index < educacion.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Habilidades Técnicas - Renderizado con map() */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon /> Stack / Habilidades Técnicas
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">Lenguajes de Programación</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {habilidadesTecnicas.lenguajes.map((skill, index) => (
                      <Chip key={index} label={skill} color={index === 0 ? 'primary' : 'default'} />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">Frameworks & Librerías</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {habilidadesTecnicas.frameworks.map((skill, index) => (
                      <Chip key={index} label={skill} />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">Bases de Datos</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {habilidadesTecnicas.baseDatos.map((skill, index) => (
                      <Chip key={index} label={skill} />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">Herramientas & Otros</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {habilidadesTecnicas.herramientas.map((skill, index) => (
                      <Chip key={index} label={skill} />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Proyectos con controles interactivos */}
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Proyectos Destacados
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Controles - Demostración de useState y eventos */}
                <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    variant={mostrarTags ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setMostrarTags(!mostrarTags)}
                  >
                    {mostrarTags ? 'Ocultar' : 'Mostrar'} Tags
                  </Button>

                  <ButtonGroup size="small">
                    <Button
                      variant={modoVista === 'grid' ? 'contained' : 'outlined'}
                      onClick={() => setModoVista('grid')}
                    >
                      Vista Grid
                    </Button>
                    <Button
                      variant={modoVista === 'list' ? 'contained' : 'outlined'}
                      onClick={() => setModoVista('list')}
                    >
                      Vista Lista
                    </Button>
                  </ButtonGroup>

                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filtrar proyectos</InputLabel>
                    <Select
                      value={filtroActivo}
                      label="Filtrar proyectos"
                      onChange={(e) => setFiltroActivo(e.target.value)}
                    >
                      <MenuItem value="">Todos los proyectos</MenuItem>
                      <MenuItem value="go">Solo Go</MenuItem>
                      <MenuItem value="mysql">Solo MySQL</MenuItem>
                      <MenuItem value="jwt">Solo JWT</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Renderizado condicional: mensaje si no hay proyectos filtrados */}
                {proyectosFiltrados.length === 0 ? (
                  <Typography variant="body1" color="text.secondary">
                    No se encontraron proyectos con el filtro: "{filtroActivo}"
                  </Typography>
                ) : (
                  /* Renderizado condicional: Grid o List según modoVista */
                  <Grid container spacing={2}>
                    {proyectosFiltrados.map((proyecto, index) => (
                      <Grid item xs={12} sm={modoVista === 'grid' ? 6 : 12} key={index}>
                        <Card elevation={2}>
                          <Box
                            component="img"
                            src={proyecto.imagen}
                            alt={proyecto.titulo}
                            sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                          />
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {proyecto.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {proyecto.descripcion}
                            </Typography>
                            {/* Renderizado condicional: mostrar tags solo si mostrarTags es true */}
                            {mostrarTags && (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {proyecto.tags.map((tag, tagIndex) => (
                                  <Chip key={tagIndex} label={tag} size="small" color="primary" variant="outlined" />
                                ))}
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Curriculum;
