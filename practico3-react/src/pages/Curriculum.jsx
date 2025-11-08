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
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Curriculum = () => {
  // useState para manejar habilidades
  const [skills] = useState([
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Node.js', level: 75 },
    { name: 'Git', level: 85 }
  ]);

  const [experience] = useState([
    {
      title: 'Desarrollador Frontend Senior',
      company: 'Tech Solutions SA',
      period: '2022 - Presente',
      description: 'Desarrollo de aplicaciones web con React, implementación de arquitecturas escalables y mentoreo de desarrolladores junior.'
    },
    {
      title: 'Desarrollador Full Stack',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      description: 'Desarrollo de aplicaciones web completas usando MERN stack, integración de APIs REST y desarrollo de componentes reutilizables.'
    },
    {
      title: 'Desarrollador Junior',
      company: 'StartUp Inc',
      period: '2018 - 2020',
      description: 'Soporte en desarrollo frontend, maquetación responsive y corrección de bugs.'
    }
  ]);

  const [education] = useState([
    {
      degree: 'Ingeniería en Sistemas',
      institution: 'Universidad Católica de Córdoba',
      year: '2024 - Presente'
    },
    {
      degree: 'Curso de React Avanzado',
      institution: 'Platzi',
      year: '2023'
    }
  ]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Header del CV */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 20px',
              bgcolor: 'primary.main',
              fontSize: '3rem'
            }}
          >
            EB
          </Avatar>
          <Typography variant="h3" component="h1" gutterBottom>
            Emanuel Boz
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Desarrollador Frontend React - 20 años
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Chip icon={<EmailIcon />} label="emanuel.boz@gmail.com" />
            <Chip icon={<PhoneIcon />} label="+54 351 123-4567" />
            <Chip icon={<LocationOnIcon />} label="Córdoba, Argentina" />
            <Chip icon={<LinkedInIcon />} label="linkedin.com/in/emanuelboz" />
            <Chip icon={<GitHubIcon />} label="github.com/emanuelboz" />
          </Box>
        </Paper>

        {/* Sobre mí */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Sobre mí
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              Desarrollador Frontend apasionado por crear experiencias de usuario excepcionales.
              Con más de 5 años de experiencia en desarrollo web, especializado en React y
              tecnologías modernas de frontend. Me enfoco en escribir código limpio, mantenible
              y escalable.
            </Typography>
          </CardContent>
        </Card>

        {/* Experiencia Laboral - Renderizado con map() */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Experiencia Laboral
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {experience.map((job, index) => (
              <Box key={index} sx={{ mb: index < experience.length - 1 ? 3 : 0 }}>
                <Typography variant="h6" component="h3">
                  {job.title}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {job.company} | {job.period}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
                {index < experience.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Educación - Renderizado con map() */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Educación
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {education.map((edu, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={edu.degree}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="primary">
                          {edu.institution}
                        </Typography>
                        {` — ${edu.year}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Habilidades - Renderizado con map() */}
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Habilidades
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={`${skill.name} (${skill.level}%)`}
                  color="primary"
                  variant={skill.level >= 85 ? "filled" : "outlined"}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Curriculum;
