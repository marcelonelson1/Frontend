import { Box, Container, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Emanuel Boz - Práctico 3 React
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="https://github.com" target="_blank" rel="noopener" color="inherit">
              <GitHubIcon />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener" color="inherit">
              <LinkedInIcon />
            </Link>
            <Link href="mailto:emanuel.boz@gmail.com" color="inherit">
              <EmailIcon />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
