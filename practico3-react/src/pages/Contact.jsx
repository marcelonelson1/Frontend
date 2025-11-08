import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // React Hook Form con validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur', // Valida cuando se pierde el foco
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Formulario enviado:', data);
    setSubmitSuccess(true);
    reset();

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Formulario de Contacto
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph align="center">
          Completa el formulario y me pondré en contacto contigo
        </Typography>

        {/* Renderizado condicional: mostrar alerta de éxito */}
        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            ¡Mensaje enviado exitosamente! Te responderé pronto.
          </Alert>
        )}

        <Card>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {/* Campo Nombre */}
              <TextField
                fullWidth
                label="Nombre completo"
                variant="outlined"
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  },
                  maxLength: {
                    value: 50,
                    message: 'El nombre no puede exceder 50 caracteres'
                  }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              {/* Campo Email */}
              <TextField
                fullWidth
                label="Correo electrónico"
                variant="outlined"
                type="email"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* Campo Asunto */}
              <TextField
                fullWidth
                label="Asunto"
                variant="outlined"
                {...register('subject', {
                  required: 'El asunto es obligatorio',
                  minLength: {
                    value: 5,
                    message: 'El asunto debe tener al menos 5 caracteres'
                  }
                })}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />

              {/* Campo Mensaje */}
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                multiline
                rows={6}
                {...register('message', {
                  required: 'El mensaje es obligatorio',
                  minLength: {
                    value: 10,
                    message: 'El mensaje debe tener al menos 10 caracteres'
                  },
                  maxLength: {
                    value: 500,
                    message: 'El mensaje no puede exceder 500 caracteres'
                  }
                })}
                error={!!errors.message}
                helperText={errors.message?.message || `${errors.message ? '' : 'Máximo 500 caracteres'}`}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Enviar Mensaje
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Paper elevation={0} sx={{ mt: 4, p: 3, bgcolor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>
            Características del formulario:
          </Typography>
          <ul>
            <li>✓ Implementado con <strong>React Hook Form</strong></li>
            <li>✓ Validaciones en tiempo real</li>
            <li>✓ Mensajes de error personalizados</li>
            <li>✓ Validación de formato de email</li>
            <li>✓ Validación de longitud mínima y máxima</li>
            <li>✓ Feedback visual con Material UI</li>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact;
