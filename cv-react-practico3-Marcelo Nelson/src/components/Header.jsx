import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" component="div" className="header-title">
          Marcelo Nelson - CV
        </Typography>

        <Box className="header-nav">
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />} className="header-nav-button">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/curriculum" startIcon={<PersonIcon />} className="header-nav-button">
            Currículum
          </Button>
          <Button color="inherit" component={Link} to="/contact" startIcon={<ContactMailIcon />} className="header-nav-button">
            Contacto
          </Button>

          {/* Renderizado condicional: mostrar Users solo si está autenticado */}
          {isAuthenticated && (
            <Button color="inherit" component={Link} to="/users" startIcon={<PeopleIcon />} className="header-nav-button">
              Usuarios
            </Button>
          )}

          {/* Renderizado condicional: Login/Logout */}
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} className="header-nav-button">
              Salir
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />} className="header-nav-button">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
