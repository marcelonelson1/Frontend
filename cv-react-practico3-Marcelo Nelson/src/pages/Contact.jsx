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
  MenuItem,
  Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Contact.css';

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
      phone: '',
      company: '',
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
              {/* Campo Nombre Completo */}
              <TextField
                fullWidth
                label="Nombre Completo"
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

              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                {/* Campo Email */}
                <TextField
                  fullWidth
                  label="Correo Electrónico"
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

                {/* Campo Teléfono */}
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                  type="tel"
                  {...register('phone', {
                    pattern: {
                      value: /^[0-9+\s-()]*$/,
                      message: 'Teléfono inválido'
                    }
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Box>

              {/* Campo Empresa/Organización */}
              <TextField
                fullWidth
                label="Empresa/Organización"
                variant="outlined"
                {...register('company')}
              />

              {/* Campo Asunto (Select) */}
              <TextField
                fullWidth
                select
                label="Asunto"
                variant="outlined"
                defaultValue=""
                {...register('subject', {
                  required: 'El asunto es obligatorio'
                })}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              >
                <MenuItem value="">Selecciona un asunto</MenuItem>
                <MenuItem value="trabajo">Oportunidad Laboral</MenuItem>
                <MenuItem value="proyecto">Colaboración en Proyecto</MenuItem>
                <MenuItem value="consulta">Consulta Técnica</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </TextField>

              {/* Campo Mensaje */}
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                multiline
                rows={6}
                placeholder="Describe tu consulta o propuesta..."
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
                helperText={errors.message?.message || 'Máximo 500 caracteres'}
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

      </Box>
    </Container>
  );
};

export default Contact;
