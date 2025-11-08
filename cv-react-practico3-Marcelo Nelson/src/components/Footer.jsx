import { Box, Container, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Box className="footer-content">
          <Typography variant="body2" className="footer-text">
            © 2024 Marcelo Nelson. Todos los derechos reservados.
          </Typography>

          <Box className="footer-links">
            <Link href="https://github.com/marcelonelson1" target="_blank" color="inherit">
              <GitHubIcon />
            </Link>
            <Link href="https://linkedin.com" target="_blank" color="inherit">
              <LinkedInIcon />
            </Link>
            <Link href="mailto:marcelinho.nelson@gmail.com" color="inherit">
              <EmailIcon />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
