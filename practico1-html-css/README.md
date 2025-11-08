# Práctico 1 - CV con HTML + CSS

Currículum Vitae estático desarrollado con HTML5 y CSS3 puro, con validaciones de formulario usando JavaScript vanilla.

## Requisitos cumplidos

### ✅ HTML Estático
- Estructura semántica con HTML5
- Secciones organizadas: header, nav, main, sections, footer
- Uso de etiquetas apropiadas: article, section, header, footer, nav

### ✅ CSS Aplicado
- Estilos personalizados en archivo externo (styles.css)
- Variables CSS (custom properties) para colores y valores reutilizables
- Flexbox y Grid para layouts responsivos
- Transiciones y animaciones suaves
- Gradientes lineales
- Box-shadow para profundidad visual
- Diseño completamente responsive con media queries

### ✅ Formulario HTML con Validaciones
- Formulario de contacto completo
- **Validaciones HTML5 nativas:**
  - `required` - campos obligatorios
  - `minlength` / `maxlength` - longitud mínima/máxima
  - `type="email"` - validación de formato email
  - `type="tel"` con `pattern` - validación de teléfono
  - `type="checkbox"` - aceptación de términos
- **Validaciones JavaScript personalizadas:**
  - Validación en tiempo real (blur y input events)
  - Mensajes de error personalizados
  - Feedback visual con colores (rojo para error, verde para válido)
  - Prevención de envío si hay errores
  - Scroll automático al primer campo con error
  - Mensaje de éxito al enviar correctamente

## Características destacadas

### Diseño
- **Responsive Design**: Se adapta a móviles, tablets y escritorio
- **Navegación sticky**: Barra de navegación que permanece visible al hacer scroll
- **Smooth scroll**: Navegación suave entre secciones
- **Gradientes**: Uso de gradientes en header y botones
- **Hover effects**: Efectos al pasar el mouse sobre elementos interactivos

### Secciones del CV
1. **Header**: Nombre y título profesional
2. **Sobre mí**: Avatar, información de contacto y biografía
3. **Experiencia Laboral**: Listado de trabajos con descripción
4. **Educación**: Estudios y certificaciones
5. **Habilidades**: Barras de progreso visuales
6. **Contacto**: Formulario completo con validaciones

### Formulario de Contacto
- 6 campos diferentes con validaciones específicas:
  - Nombre (texto, 3-50 caracteres)
  - Email (formato email válido)
  - Teléfono (8-15 dígitos)
  - Asunto (5-100 caracteres)
  - Mensaje (textarea, 10-500 caracteres)
  - Motivo (select con opciones)
  - Checkbox de aceptación de términos
- Feedback visual instantáneo
- Mensajes de error descriptivos
- Mensaje de éxito al enviar

## Uso

1. Simplemente abre el archivo `index.html` en tu navegador web
2. No requiere instalación de dependencias ni servidor
3. Funciona completamente offline

```bash
# Opción 1: Abrir directamente
# Doble clic en index.html

# Opción 2: Usar un servidor local simple (opcional)
# Si tienes Python instalado:
python -m http.server 8000
# Luego visita http://localhost:8000

# Si tienes Node.js y npx:
npx serve
```

## Estructura de archivos

```
practico1-html-css/
├── index.html      # Estructura HTML del CV
├── styles.css      # Estilos CSS
├── script.js       # Validaciones JavaScript
└── README.md       # Este archivo
```

## Compatibilidad

- Chrome, Firefox, Safari, Edge (versiones modernas)
- Dispositivos móviles iOS y Android
- Tablets y escritorio

## Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados (Grid, Flexbox, Variables CSS, Gradientes)
- **JavaScript (Vanilla)**: Validaciones del formulario
- Sin frameworks ni librerías externas

## Características CSS destacadas

- Variables CSS (`:root`)
- Grid Layout para cards y skills
- Flexbox para navegación y footer
- Media queries para responsive design
- Pseudo-clases (`:hover`, `:focus`, `:invalid`, `:valid`)
- Transiciones suaves
- Box-shadow para profundidad
- Gradientes lineales
- Border-radius para esquinas redondeadas
