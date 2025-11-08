import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Container maxWidth="md">
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/')}
          className="about-back-button"
        >
          Volver al Inicio
        </Button>

        <Paper className="about-paper">
          <Typography variant="h3" component="h1" className="about-title">
            Acerca del Sistema
          </Typography>

          <Box className="about-section">
            <Typography variant="h5" className="about-section-title">
              ¿Qué es este sistema?
            </Typography>
            <Typography variant="body1" className="about-text">
              Este es un sistema completo de gestión de notas desarrollado con tecnologías
              modernas. Permite a los usuarios crear, editar, organizar y archivar notas de
              manera eficiente.
            </Typography>
          </Box>

          <Box className="about-section">
            <Typography variant="h5" className="about-section-title">
              Características Principales
            </Typography>
            <ul className="about-list">
              <li>Autenticación de usuarios con Context API</li>
              <li>Gestión completa de notas (CRUD)</li>
              <li>Sistema de categorías con colores</li>
              <li>Filtrado y búsqueda de notas</li>
              <li>Archivo de notas completadas</li>
              <li>Interfaz responsiva con Material UI</li>
              <li>Formularios con validaciones usando React Hook Form</li>
              <li>Rutas públicas y privadas</li>
            </ul>
          </Box>

          <Box className="about-section">
            <Typography variant="h5" className="about-section-title">
              Tecnologías Utilizadas
            </Typography>
            <Box className="tech-grid">
              <Box className="tech-item">
                <Typography variant="subtitle1" className="tech-name">
                  Frontend
                </Typography>
                <Typography variant="body2" className="tech-description">
                  React 18 + TypeScript
                </Typography>
              </Box>
              <Box className="tech-item">
                <Typography variant="subtitle1" className="tech-name">
                  UI Framework
                </Typography>
                <Typography variant="body2" className="tech-description">
                  Material UI
                </Typography>
              </Box>
              <Box className="tech-item">
                <Typography variant="subtitle1" className="tech-name">
                  Formularios
                </Typography>
                <Typography variant="body2" className="tech-description">
                  React Hook Form
                </Typography>
              </Box>
              <Box className="tech-item">
                <Typography variant="subtitle1" className="tech-name">
                  Backend
                </Typography>
                <Typography variant="body2" className="tech-description">
                  Go + Gin Framework
                </Typography>
              </Box>
              <Box className="tech-item">
                <Typography variant="subtitle1" className="tech-name">
                  Base de Datos
                </Typography>
                <Typography variant="body2" className="tech-description">
                  MariaDB + GORM
                </Typography>
              </Box>
              <Box className="tech-item">
                <Typography variant="subtitle1" className="tech-name">
                  HTTP Client
                </Typography>
                <Typography variant="body2" className="tech-description">
                  Axios con interceptores
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="about-cta">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              className="about-cta-button"
            >
              Comenzar Ahora
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AboutPage;
