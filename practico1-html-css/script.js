// Validación del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Mensajes de error personalizados
    const errorMessages = {
        nombre: {
            valueMissing: 'El nombre es obligatorio',
            tooShort: 'El nombre debe tener al menos 3 caracteres',
            tooLong: 'El nombre no puede exceder 50 caracteres'
        },
        email: {
            valueMissing: 'El email es obligatorio',
            typeMismatch: 'Por favor ingresa un email válido'
        },
        telefono: {
            valueMissing: 'El teléfono es obligatorio',
            patternMismatch: 'El teléfono debe contener entre 8 y 15 dígitos'
        },
        asunto: {
            valueMissing: 'El asunto es obligatorio',
            tooShort: 'El asunto debe tener al menos 5 caracteres',
            tooLong: 'El asunto no puede exceder 100 caracteres'
        },
        mensaje: {
            valueMissing: 'El mensaje es obligatorio',
            tooShort: 'El mensaje debe tener al menos 10 caracteres',
            tooLong: 'El mensaje no puede exceder 500 caracteres'
        },
        motivo: {
            valueMissing: 'Por favor selecciona un motivo de contacto'
        },
        acepto: {
            valueMissing: 'Debes aceptar la política de privacidad'
        }
    };

    // Función para mostrar errores
    function showError(input, message) {
        const errorElement = document.getElementById(`error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.setAttribute('aria-invalid', 'true');
    }

    // Función para limpiar errores
    function clearError(input) {
        const errorElement = document.getElementById(`error${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.setAttribute('aria-invalid', 'false');
    }

    // Función para validar un campo
    function validateField(input) {
        const validity = input.validity;
        const fieldName = input.id;

        // Limpiar error anterior
        clearError(input);

        // Verificar si el campo es válido
        if (validity.valid) {
            return true;
        }

        // Determinar qué tipo de error hay
        const messages = errorMessages[fieldName];
        if (!messages) return false;

        if (validity.valueMissing) {
            showError(input, messages.valueMissing);
        } else if (validity.typeMismatch) {
            showError(input, messages.typeMismatch);
        } else if (validity.tooShort) {
            showError(input, messages.tooShort);
        } else if (validity.tooLong) {
            showError(input, messages.tooLong);
        } else if (validity.patternMismatch) {
            showError(input, messages.patternMismatch);
        }

        return false;
    }

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Validar al perder el foco (blur)
        input.addEventListener('blur', function() {
            if (this.value) {
                validateField(this);
            }
        });

        // Validar mientras se escribe (input)
        input.addEventListener('input', function() {
            if (this.getAttribute('aria-invalid') === 'true') {
                validateField(this);
            }
        });
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validar todos los campos
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        // Si el formulario es válido, mostrarlo
        if (isValid) {
            // Ocultar el formulario
            form.style.display = 'none';

            // Mostrar mensaje de éxito
            successMessage.style.display = 'block';

            // Scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Opcional: resetear el formulario después de 5 segundos
            setTimeout(function() {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';

                // Limpiar todos los errores
                inputs.forEach(input => clearError(input));
            }, 5000);
        } else {
            // Hacer scroll al primer campo con error
            const firstError = form.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Smooth scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
